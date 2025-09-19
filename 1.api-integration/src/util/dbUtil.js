const db = require("../config/database/connection_config");

/**
 * Global check exist
 *
 * @param query {knex.QueryBuilder<> | knex.QueryInterface<>}
 * @return {Promise<boolean>}
 */
exports.checkExistTable = async (query) => {
  const check = await db.raw(
    `select exists(${query.first(1).toQuery()}) as "check"`,
  );
  return check.rows[0].check;
};
