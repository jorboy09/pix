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
        return {
            ...state,
            event: action.json.event.map((event) => {
                event.start_time = new Date(event.start_time)
                event.end_time = new Date(event.end_time)
                return event
            }),
        }
    }
    return {
        ...state
    }
}