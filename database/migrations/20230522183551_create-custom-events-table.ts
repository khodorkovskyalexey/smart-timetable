import type { Knex } from 'knex';

const tableName = 'custom_events';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();

    table.uuid('lecturerId').references('id').inTable('users').notNullable();
    table.uuid('groupId').references('id').inTable('groups').notNullable();
    table.string('name').notNullable();
    table.string('auditoriumName').notNullable();
    table.timestamp('startAt').notNullable();
    table.timestamp('endAt').notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());

    table.check('"startAt" <= "endAt"');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
