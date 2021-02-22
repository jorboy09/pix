import "react-big-calendar/lib/css/react-big-calendar.css";
import style from './CreatorAddEvent.module.css'
import { useState } from 'react';
import { addEvent } from '../../redux/calendar/action';
import { CalendarBoard } from '../../components/calendar/CalendarBoard';
import { useDispatch } from 'react-redux';
export function AddEvent() {
    
    const [title, setTitle] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [startTime, setStartTime] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const dispatch = useDispatch()
    return (
        <div className="center-scroll-area">
            <div className={style.title}>加入活動</div>
            <div className={style.container}>
                <form className={style.event_form} onSubmit={(e) => {
                    e.preventDefault()
                    if (title.trim()===''|| startDate.trim()==='' || startTime.trim()==='' || endTime.trim()===''|| endDate.trim()===''){
                        alert("Please input all neccessary fields")
                        return
                    }
                    let event = {
                        title: title,
                        start_time: new Date(startDate +'T'+ startTime),
                        end_time: new Date(endDate +'T'+ endTime),
                        location: location,
                        description: description
                    }
                    dispatch(addEvent(event))
                    setDescription('')
                    setEndDate('')
                    setEndTime('')
                    setStartDate('')
                    setStartTime('')
                    setTitle('')
                    setLocation('')
                }}>
                    <div>
                        <div className={style.label}>活動: </div>
                        <input type='text' value={title} onChange={(event) => setTitle(event.currentTarget.value)}></input>
                    </div>
                    <div>
                        <div className={style.label}>開始日期: </div>
                        <input type='date' value={startDate} onChange={(event) => setStartDate(event.currentTarget.value)}></input>
                    </div>
                    <div>
                        <div className={style.label}>開始時間: </div>
                        <input type='time' value={startTime} onChange={(event) => setStartTime(event.currentTarget.value)}></input>
                    </div>
                    <div>
                        <div className={style.label}>結束日期: </div>
                        <input type='date' value={endDate} onChange={(event) => setEndDate(event.currentTarget.value)}></input>
                    </div>
                    <div>
                        <div className={style.label}>結束時間: </div>
                        <input type='time' value={endTime} onChange={(event) => setEndTime(event.currentTarget.value)}></input>
                    </div>
                    <div>
                        <div className={style.label}>地點: </div>
                        <input type='text' value={location} onChange={(event) => setLocation(event.currentTarget.value)}></input>
                    </div>
                    <div className={style.description}>
                        <div>內容: </div>
                        <textarea value={description} onChange={(event) => setDescription(event.currentTarget.value)}></textarea>
                    </div>
                    <div className={style.submit}>
                        <button type='submit'>加入</button>
                    </div>
                </form>
                <div className={style.calendar_container}>
                <CalendarBoard />
                </div>
            </div>
        </div>
    )
}