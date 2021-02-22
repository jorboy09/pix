import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('domains');

    await knex.schema.createTable('domains', (table) => {
        table.increments();
        table.string('creator');
        table.string('api');
        table.string('front')
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('domains')
}

