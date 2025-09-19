const axios = require("axios");
const loggerUtil = require("../../util/loggerUtil");
const querystring = require("querystring");
const rax = require("retry-axios");
const instance = axios.create({
  baseURL: process.env.DOG_API_BASE_URL,
});

rax.attach(instance);

instance.interceptors.response.use(
  (data) => data.data,
  (error) => {
    if (error.response === undefined) {
      loggerUtil.error("dog api is unreachable");
      return Promise.reject(error);
    }

    const parsedObject = querystring.parse(error.response.config.data);
    const jsonString = JSON.stringify(parsedObject, null, 2);
    loggerUtil.error(
      `dog http status ${error.response.status} url: [${error.response.config.method}] ${error.response.config.url} body: ${jsonString} error: ${JSON.stringify(error.response.data)}`,
    );

    return Promise.reject(error.response.data);
  },
);

module.exports = instance;
