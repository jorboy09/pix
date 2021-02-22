import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('social_media');

    await knex.schema.createTable('social_media', (table) => {
        table.increments();
        table.string('media');
        table.string("name");
    })

    await knex.schema.alterTable('creator', (table) => {
        table.dropColumn('social_media');
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTableIfExists('social_media');

    await knex.schema.alterTable('creator', (table) => {
        table.json('social_media').nullable();
    })

}

