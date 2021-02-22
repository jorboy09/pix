import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEventList } from '../../redux/calendar/action'
import { RootState } from '../../redux/store'
import style from './CalendarBoard.module.css'
import { PopUpEvent } from '../Event/PopUpEvent'
import {Event} from '../Event/Event'


export function CalendarBoard() {
    const now = new Date()
    const localizer = momentLocalizer(moment)
    const calendarWidth = (document.querySelector(style.event_calendar_board)?.clientWidth!)
    const calendarHeight = (document.querySelector(style.event_calendar)?.clientHeight!)
    const [popUpDetails, setpopUpDetails] = useState<{
        title: string,
        start_time: Date,
        end_time: Date,
        location: string | null,
        description: string | null
    }>({
        title: '',
        start_time: new Date(),
        end_time: new Date(),
        location: null,
        description: null
    })
    const [eventPopUp, seteventPopUp] = useState<boolean>(false)
    const eventList = useSelector((state: RootState) => state.eventList.event)
    const upcomingEvent = eventList.filter(event => event.start_time > now)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEventList())
    }, [dispatch])

    return (
    <div className={style.event_calendar_board}>
        <div className={style.event_calendar}>
            <Calendar
                popup={true}
                localizer={localizer}
                events={eventList}
                defaultView='month'
                views={['month']}
                startAccessor="start_time"
                endAccessor="end_time"
                toolbar={true}
                defaultDate={new Date(now.getFullYear(), now.getMonth(), 1)}
                style={{ height: calendarHeight, width: calendarWidth }}
                onSelectEvent={(event) => { seteventPopUp(!eventPopUp); setpopUpDetails(event)}}
                eventPropGetter={event => ({ className: style.calendar_event_title })}
                dayPropGetter={date=> ({className: style.date})}
            />
            {eventPopUp ? <PopUpEvent event={popUpDetails} onclick={() => seteventPopUp(false)} /> : null}
        </div>
        <div className={style.event_board}>
            <div className={style.event_title}>近期活動</div>
            <div className={style.event_list}>
                {upcomingEvent[0] ? <Event event={upcomingEvent[0]} /> : '(Empty)'}
                {upcomingEvent[1] ? <Event event={upcomingEvent[1]} /> : null}
            </div>
        </div>
    </div>)
}