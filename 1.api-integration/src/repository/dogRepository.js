const db = require("../config/database/connection_config");
const { checkExistTable } = require("../util/dbUtil");

exports.getAll = async () => {
  return db("dog").select("*");
};

exports.checkByExternalId = async (externalId) => {
  return checkExistTable(db("dog").where("external_id", externalId));
};

exports.save = async (data) => {
  await db("dog").insert(data);
};

exports.truncate = async () => {
  await db("dog").truncate();
};
