import { CalendarAction } from './action'

export interface EventList {
    event: {
        title: string,
        start_time: Date,
        end_time: Date,
        location: string | null,
        description: string | null
    }[]
}

const initEventList: EventList = {
    event: [{
        title: '',
        start_time: new Date(),
        end_time: new Date(),
        location: null,
        description: null
    }]

}

export function CalendarReducer(state: EventList = initEventList, action: CalendarAction) {
    if (action.type === '@@calendar/GetEventList') {
        const json = action.json
        let event_list_date = json.event.concat([])
        if (event_list_date.length !== 0) {
            event_list_date = event_list_date.map((event) => {
                event.start_time = new Date(event.start_time)
                event.end_time = new Date(event.end_time)
                return event
            })
        }
        return {
            ...state,
            event: event_list_date,
        }
    }
    return {
        ...state
    }
}