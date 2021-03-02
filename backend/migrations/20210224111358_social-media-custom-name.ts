import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('social_media', table => {
        table.string('custom_name')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('social_media', table => {
        table.dropColumn('custom_name')
    })
}

