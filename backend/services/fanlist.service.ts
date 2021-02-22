import * as Knex from 'knex'

export class FanListService {
    constructor(private knex: Knex) { }

    async getfanList(searchtext: string, date: string) {
        if (date == 'NaN-NaN-NaN' || date ==''){
            //create a temporary table named record
            //export record as activity column with json_agg() group by fans
            const search = '%'+searchtext.toLowerCase()+'%'
            const fanList = await this.knex.raw(`
            with record as (select created_at, message, fans_id from fans_zone)
            select fans.id, fans.username as name, fans.super_fans, json_agg(record) as activity from fans 
            full join record on fans.id = record.fans_id where lower(fans.username) like :search and fans.blacklisted = false
            group by fans.id ;`, {search})
            return fanList
        }else {
            //create a temporary table named record
            //export record as activity column with json_agg() group by fans
            const search = '%'+searchtext.toLowerCase()+'%'
            const fanList = await this.knex.raw(`
            with record as (select created_at, message, fans_id from fans_zone where date(created_at) = date(:date))
            select fans.id, fans.username as name, fans.super_fans, json_agg(record) as activity from fans 
            join record on fans.id = record.fans_id where lower(fans.username) like :search and fans.blacklisted = false
            group by fans.id ;`, {search, date})
            return fanList
        }
    }

    async setSuperFan(id: number) {
        const isSuperFan = (await this.knex('fans').select('super_fans').where('id', '=', id))[0].super_fans
        return await this.knex('fans').update('super_fans', !isSuperFan).where('id', '=', id).returning('*')
    }

    async banFan(id: number) {
        return await this.knex('fans').update('blacklisted', true).where('id', '=', id).returning('*')
    }
}