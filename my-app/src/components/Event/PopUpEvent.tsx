import cross from '../../button_img/cross.svg'
import style from './PopUpEvent.module.css'

export function PopUpEvent(props:{
    event:{
        title: string;
        start_time: Date;
        end_time: Date;
        location: string | null;
        description: string | null;
    };
    onclick: ()=>void
}) {
    return (
        <div className={style.popUpEvent}>
            <div className={style.close}>
                <img src={cross} onClick={props.onclick} alt=''></img>
            </div>
            <label>活動: {props.event.title}</label>
            <label>開始時間: {props.event?.start_time.getDate()+'/'+(props.event?.start_time.getMonth()!+1)+'/'+
              props.event?.start_time.getFullYear()+' '+
              (0+props.event?.start_time.getHours().toString()!).substr(-2,2)+':'+ (0+props.event?.start_time.getMinutes().toString()!).substr(-2,2)}</label>
            <label>結束時間: {props.event?.end_time.getDate()+'/'+(props.event?.end_time.getMonth()!+1)+'/'+
              props.event?.end_time.getFullYear()+' '+
              (0+props.event?.end_time.getHours().toString()!).substr(-2,2)+':'+ (0+props.event?.end_time.getMinutes().toString()!).substr(-2,2)}</label>
            <label>地點: {props.event.location}</label>
            <p>內容: {props.event.description}</p>
        </div>
    )
}