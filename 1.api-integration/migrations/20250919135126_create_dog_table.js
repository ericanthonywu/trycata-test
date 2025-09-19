/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTable("dog", (table) => {
    table.bigIncrements('id').primary();
    table.uuid('external_id').unique();
    table.string('type');
    table.json('attributes');
    table.json('relationships');
    table.timestamps(true, true);

    table.index('external_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable("dog");
};
