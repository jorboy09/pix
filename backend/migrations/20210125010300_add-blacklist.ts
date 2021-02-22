import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('fans', (table) => {
        table.dropColumn('blacklisted');
    })

    await knex.schema.alterTable('fans', (table) => {
        table.boolean('blacklisted');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('fans', (table) => {
        table.dropColumn('blacklisted');
    })
}

