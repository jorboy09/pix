import * as Knex from 'knex'

export class ConnectionService {
    constructor(private knex: Knex) {}

    async getAllDomain(){
        let list = await this.knex.select('*').from('domains')
        return list
    }

    async getAllApis(){
        let list = await this.knex.select('api').from('domains')
        return list
    }

    async updateList(creator: string, frontend: string, api: string){
        return await this.knex.insert({
            'creator': creator,
            'api': api,
            'front': frontend
        }).returning('*')
    }

    async initializeList(list: {creator: string, front: string, api: string}[]){
        return await this.knex.insert(list).returning('*')
    }

    // async getDomainWithoutAPI(){
    //     let list = await this.knex.select('creator', 'api').from('domains')
    //     return list
    // }
}