import style from './FanActivity.module.css'

export function FanActivity(props: {
    created_at: string,
    message: string
}) {
    const date = new Date(props.created_at)
    return (
        <div className={style.activity_box}>
            <div className={style.activity}>
                {props.created_at!==''? <div className={style.action_time}>
                    <div>{date.getDate() + '/' + (parseInt(date.getMonth().toString())+1) +'/' + date.getFullYear()}</div>
                    <div>{date.getHours() + ' : '+ date.getMinutes()}</div>
                </div>:null}
                <div className={style.action_content}>
                    {props.message}
                </div>
            </div>
            <div className={style.line}></div>
        </div>
    )
}