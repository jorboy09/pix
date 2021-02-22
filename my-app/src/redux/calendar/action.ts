import { Dispatch } from "react"
import { RootState } from "../store"
import { EventList } from "./reducer"
import urljoin from 'url-join'

export function getEventList(json: EventList) {
    return {
        type: '@@calendar/GetEventList' as '@@calendar/GetEventList',
        json
    }
}

type CalendarActionCreator = typeof getEventList

export type CalendarAction = ReturnType<CalendarActionCreator>

export function fetchEventList(){
    return async (dispatch: Dispatch<any>, getState: () => RootState) =>{
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/eventList'))
        const json = await res.json();
        if (json.result) {
            dispatch(getEventList(json))
        }
    }
}

export function addEvent(event :EventList['event'][0]){
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/addEvent'),{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        const json = await res.json()
        if (json.result) {
            dispatch(fetchEventList())
        }
    }
}