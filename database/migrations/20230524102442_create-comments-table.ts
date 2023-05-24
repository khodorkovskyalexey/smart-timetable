import type { Knex } from 'knex';

const tableName = 'comments';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();

    table.uuid('customEventId').references('id').inTable('custom_events').unique().index();
    table.string('lessonEncodedId').unique().index();
    table.uuid('authorId').references('id').inTable('users').notNullable();
    table.text('text').notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());

    table.check(`
      ("customEventId" IS NOT NULL AND "lessonEncodedId" IS NULL) OR
      ("customEventId" IS NULL AND "lessonEncodedId" IS NOT NULL)
    `);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
