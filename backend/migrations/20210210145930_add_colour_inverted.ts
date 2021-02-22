import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('creator', (table) => {
        table.boolean('color_inverted');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('creator', (table) => {
        table.dropColumn('color_inverted');
    })
}

