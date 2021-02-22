import fs from 'fs'
import * as Knex from 'knex'

export class BoardService {
    constructor(private knex: Knex) { }

    async getCustomBoard() {
        return await this.knex.select('*').from('board')
    }

    async customizeBoard(body, file) {
        const id = (await this.knex.select('*').from('board'))[0].id
        return await this.knex('board').update({'title': body.title, 'media': file.key, 'description': body.description}).where('id', '1').returning('*')
        // return await this.knex('board').update({'title': body.title, 'media': file.filename, 'description': body.description}).where('id', id).returning('*')
    }
}