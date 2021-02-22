import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('events', (table) => {
        table.dropColumn('start_time');
        table.dropColumn('end_time');
    })

    await knex.schema.alterTable('events', (table) => {
        table.timestamp('start_time');
        table.timestamp('end_time');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('events', (table) => {
        table.dropColumn('start_time');
        table.dropColumn('end_time');
    })

    await knex.schema.alterTable('events', (table) => {
        table.time('start_time');
        table.time('end_time');
    })
}

