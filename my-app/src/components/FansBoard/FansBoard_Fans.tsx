import superuser from '../../button_img/superuser_clicked.svg'
import style from './FansBoard_Fans.module.css'

export function FansBoardFans(props:{
    name: string,
    superfan: Boolean
}) {

    return (
        <div className={style.fan}>
            <div>{props.name}</div>
            {props.superfan? <img src={superuser} alt=''></img>: null}
        </div>
    )
}