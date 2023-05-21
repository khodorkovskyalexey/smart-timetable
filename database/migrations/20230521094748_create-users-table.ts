import type { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();

    table.string('email').notNullable().unique().index();
    table.string('password').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.integer('lecturerOmgtuRaspId').unsigned().notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
