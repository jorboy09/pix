import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('fans_zone', (table) => {
        table.boolean('isCreator');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('fans_zone', (table) => {
        table.dropColumn('isCreator');
    })
}

