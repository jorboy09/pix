import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('creator');
    await knex.schema.dropTableIfExists('fans_zone');
    await knex.schema.dropTableIfExists('fans');
    await knex.schema.dropTableIfExists('events');
    await knex.schema.dropTableIfExists('posts');
    await knex.schema.dropTableIfExists('products');

    await knex.schema.createTable('creator', (table) => {
        table.increments();
        table.string('username');
        table.string("password");
        table.string("description");
        table.string("profile_pic").nullable();
        table.string("cover_pic").nullable();
        table.string("email").nullable();
        table.string("phone").nullable();
        table.string("board_category");
        table.integer('color_theme');
        table.json('social_media').nullable();
    })
    await knex.schema.createTable('fans', (table) => {
        table.increments();
        table.string('username');
        table.string('password');
        table.string('description');
        table.string('profile_pic').nullable();
        table.boolean('super_fans');
        table.boolean('blacklisted');
    })
    await knex.schema.createTable('events', (table) => {
        table.increments();
        table.string('title');
        table.string('description');
        table.timestamp('start_date');
        table.timestamp('end_date');
        table.time('start_time');
        table.time('end_time');
        table.string('location');
    })
    await knex.schema.createTable('posts', (table) => {
        table.increments();
        table.string('title');
        table.string('description');
        table.string('text').nullable();
        table.string('image_name').nullable();
        table.string('video_name').nullable();
        table.string('audio_name').nullable();
        table.timestamp('scheduled_upload').nullable();
    })
    await knex.schema.createTable('products', (table) => {
        table.increments();
        table.string('name');
        table.string('description');
        table.string('image_name');
        table.integer('price');
    })
    await knex.schema.createTable('fans_zone', (table) => {
        table.increments();
        table.integer('fans_id')
        table.foreign('fans_id').references('fans.id');
        table.text('message')
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTableIfExists('creator');
    await knex.schema.dropTableIfExists('fans_zone');
    await knex.schema.dropTableIfExists('fans');
    await knex.schema.dropTableIfExists('events');
    await knex.schema.dropTableIfExists('posts');
    await knex.schema.dropTableIfExists('products');
}

