import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import style from './Event.module.css'

export function Event(props:{
  event:{
    title: string;
    start_time: Date;
    end_time: Date;
    location: string | null;
    description: string | null;
}| null;
}) {
  const creator = useSelector((state: RootState)=> state.curUser.username)
    return (
        <div className={style.box}>
            <div className={style.line1}></div>
            <div className={style.line2}></div>
            <div className={style.event}>
              <div className={style.names}>
                <div className={style.event_title}>活動: {props.event?.title}</div>
                <div className={style.holder}>舉辦者: {creator}</div>
              </div>
              <div>地點: {props.event?.location}</div>
              <div>開始時間: {props.event?.start_time.getDate()+'/'+(props.event?.start_time.getMonth()!+1)+'/'+
              props.event?.start_time.getFullYear()+' '+
              (0+props.event?.end_time.getHours().toString()!).substr(-2,2)+':'+ (0+props.event?.end_time.getMinutes().toString()!).substr(-2,2)}</div>
              <div>結束時間: {props.event?.end_time.getDate()+'/'+(props.event?.end_time.getMonth()!+1)+'/'+
              props.event?.end_time.getFullYear()+' '+
              (0+props.event?.end_time.getHours().toString()!).substr(-2,2)+':'+ (0+props.event?.end_time.getMinutes().toString()!).substr(-2,2)}</div>
              <div>內容: {props.event?.description}</div>
            </div>
          </div>
    )
}