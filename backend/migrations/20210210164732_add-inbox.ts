import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('inbox');

    await knex.schema.createTable('inbox', (table) => {
        table.increments();
        table.boolean('creator');
        table.string('message');
        table.timestamps(false, true);
        table.integer('fans_id');
        table.foreign('fans_id').references('fans.id');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('inbox');

}




