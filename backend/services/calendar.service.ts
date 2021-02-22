import * as Knex from 'knex'
interface EventList {
    event: {
        title: string,
        start_time: Date,
        end_time: Date,
        location: string | null,
        description: string | null
    }[]
}
export class CalendarService {
    constructor(private knex: Knex) { }

    async getEventList() {
        return await this.knex.select('*').from('events').orderBy('start_time', 'asc')
    }

    async addEvent(event: EventList['event'][0]) {
        return await this.knex('events').insert({
            title: event.title,
            start_time: event.start_time,
            end_time: event.end_time,
            location: event.location,
            description: event.description
        }).returning('*')
    }
}