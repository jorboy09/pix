import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('creator', (table) => {
        table.timestamps(false, true)
    })
    await knex.schema.alterTable('fans', (table) => {
        table.timestamps(false, true)
    })
    await knex.schema.alterTable('events', (table) => {
        table.timestamps(false, true)
    })
    await knex.schema.alterTable('posts', (table) => {
        table.timestamps(false, true)
    })
    await knex.schema.alterTable('products', (table) => {
        table.timestamps(false, true)
    })
    await knex.schema.alterTable('fans_zone', (table) => {
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('creator', (table) => {
        table.dropTimestamps()
    })
    await knex.schema.alterTable('fans', (table) => {
        table.dropTimestamps()
    })
    await knex.schema.alterTable('events', (table) => {
        table.dropTimestamps()
    })
    await knex.schema.alterTable('posts', (table) => {
        table.dropTimestamps()
    })
    await knex.schema.alterTable('products', (table) => {
        table.dropTimestamps()
    })
    await knex.schema.alterTable('fans_zone', (table) => {
        table.dropTimestamps()
    })
}

