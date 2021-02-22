import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('board');

    await knex.schema.createTable('board', (table)=>{
        table.increments();
        table.string('title');
        table.string('media');
        table.text('description');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('board');
}

