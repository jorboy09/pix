import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import style from './CreatorCalendar.module.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../components/Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventList } from '../../redux/calendar/action';
import { RootState } from '../../redux/store';
import { PopUpEvent } from '../../components/Event/PopUpEvent';

export function CreatorCalendar() {
  const now = new Date()
  const calendarWidth = (document.querySelector(style.current_month)?.clientWidth!)
  const calendarHeight = (document.querySelector(style.current_month)?.clientHeight!)
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
  const upcomingEvent = eventList.filter(event=>event.start_time> now)
  const localizer = momentLocalizer(moment)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventList())
  }, [dispatch])

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.hidden}></div>
        <div className={style.title}>活動</div>
        <Link to='/creatorAddEvent'><div className={style.add_event}>加入活動</div></Link>
      </div>
      <div className={style.calendar}>
        <div className={style.current_month}>
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
            onSelectEvent={(event)=>{seteventPopUp(!eventPopUp); setpopUpDetails(event)}}
            eventPropGetter={event => ({ className: style.calendar_event_title })}
          />
          {eventPopUp? <PopUpEvent event={popUpDetails} onclick={()=>seteventPopUp(false)}/>:null}
        </div>
      </div>
      <div className={style.event_board}>
        <div className={style.event_title}>近期活動</div>
        <div className={style.event_list}>
          {upcomingEvent[0]? <Event event={upcomingEvent[0]}/>: null}
          {upcomingEvent[1]?<Event event={upcomingEvent[1]}/>: null}
        </div>
      </div>
    </div>
  )
}