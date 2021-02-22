import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('events', (table) => {
        table.dropColumns('start_date', 'end_date');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('events', (table) => {
        table.timestamp('start_date');
        table.timestamp('end_date');
    })
}

