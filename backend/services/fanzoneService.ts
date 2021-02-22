import knex from 'knex';

export class FanzoneService {
    constructor(private knex: knex) { }

    public async getFanzone() {
        let comment = await this.knex.select("fans_zone.*", "fans.username").from('fans_zone').fullOuterJoin('fans', 'fans.id', 'fans_zone.fans_id').orderBy('created_at', 'desc').limit(10)
        return comment;
    }

    public async postFanzone(fansid: number | null, message: string, isCreator: boolean) {
        // let id = await this.knex.select('id').from('fans')
        let res = await this.knex.insert({
            fans_id: fansid,
            // fans_id: id[0].id,
            message: message,
            isCreator: isCreator
        }).into('fans_zone').returning('*')

        return res;

    }
}