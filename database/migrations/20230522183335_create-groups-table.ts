import type { Knex } from 'knex';

const tableName = 'groups';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();

    table.integer('groupOmgtuRaspId').unsigned().unique();
    table.integer('subgroupOmgtuRaspId').unsigned().unique();
    table.integer('groupListOmgtuRaspId').unsigned().unique();

    table.string('name').notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());

    // only one of omgtuRaspId is not null
    table.check(`
      ("groupOmgtuRaspId" IS NOT NULL AND "subgroupOmgtuRaspId" IS NULL AND "groupListOmgtuRaspId" IS NULL) OR
      ("groupOmgtuRaspId" IS NULL AND "subgroupOmgtuRaspId" IS NOT NULL AND "groupListOmgtuRaspId" IS NULL) OR
      ("groupOmgtuRaspId" IS NULL AND "subgroupOmgtuRaspId" IS NULL AND "groupListOmgtuRaspId" IS NOT NULL)
    `);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
