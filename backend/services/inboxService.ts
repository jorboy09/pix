import knex from 'knex';

export class InboxService {
    constructor(private knex: knex) { }

    public async getInboxMessage(id: number) {
        const message = await this.knex.select('fans.username', 'fans.super_fans', 'fans.id', 'inbox.creator', 'inbox.message', 'inbox.created_at').from('fans').innerJoin('inbox', 'fans.id', 'inbox.fans_id').where('fans.id', id)

        return message;
    }

    public async getAllFansMessageNames(){
        const nameList = await this.knex.distinct('fans.username', 'fans.super_fans', 'fans.id').from('fans').innerJoin('inbox', 'fans.id', 'inbox.fans_id')

        return nameList;

    }

    public async postInboxMessage( creator: boolean | null, message: string | null, id: number) {

        let res = await this.knex('inbox').insert({
            fans_id: id,
            creator: creator,
            message: message,
        }).returning('*')

        return res;

    }
}