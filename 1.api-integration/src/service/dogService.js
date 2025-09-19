const dogApi = require("../config/adapter/dogApi");
const dogRepository = require("../repository/dogRepository");
const loggerUtil = require("../util/loggerUtil");
const redis = require("../config/redis/redis_config");

exports.sync = async () => {
  const response = await dogApi.get("/breeds");

  const maxPagination = response.meta.pagination.last;

  const pagePromises = [];
  for (let i = 2; i <= maxPagination; i++) {
    pagePromises.push(
      dogApi.get(`/breeds`, {
        params: {
          "page[number]": i,
        },
      }),
    );
  }

  // concurrently fetch all pages
  const responses = await Promise.all(pagePromises);

  let unsyncedData = 0;
  for (const response of responses) {
    for (let item of response.data) {
      item = {
        ...item,
        external_id: item.id,
        id: undefined,
      };
      const redisData = redis.get(`dog-${item.external_id}`);
      if (redisData) {
        continue;
      }

      await redis.set(`dog-${item.external_id}`, item, {
        EX: process.env.REDIS_TTL,
      });

      const dbData = await dogRepository.checkByExternalId(item.external_id);
      if (dbData) {
        continue;
      }

      unsyncedData++;
      await dogRepository.save(item);
    }
  }

  loggerUtil.info(`synced ${unsyncedData} breeds`);
};

exports.get = async () => {
  const keys = [];
  let cursor = "0";
  do {
    const result = await redis.scan(cursor, { MATCH: "dog-*" });
    cursor = result.cursor.toString();
    keys.push(...result.keys);
  } while (cursor !== "0");

  const redisData = await redis.mGet(keys);
  if (redisData) {
    loggerUtil.info("getting data from redis cache");
    return redisData
      .filter((item) => item) // filter non null values
      .map((item) => JSON.parse(item));
  }
  loggerUtil.info("getting data from database, resetting redis cache");
  const dbData = await dogRepository.getAll();
  for (const item of dbData) {
    await redis.set(`dog-${item.external_id}`, item);
  }

  return dbData;
};
