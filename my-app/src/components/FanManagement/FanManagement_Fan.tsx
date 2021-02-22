import superfan from '../../button_img/superuser.svg'
import clickedsuperfan from '../../button_img/superuser_clicked.svg'
import cross from '../../button_img/cross.svg'
import style from './FanManagement_Fan.module.css'
import { useEffect, useState } from 'react'
import { FanActivity } from '../FanActivity/FanActivity'
import { banFan, fetchFanList, getFanList, setSuperFan } from '../../redux/fanlist/action'
import { useDispatch } from 'react-redux'

export function Fan(props: {
    id: number | null,
    name: string,
    super_fans: boolean,
    activity: {
        created_at: string,
        message: string;
    }[],
    searchtext: string,
    datesearch: string;
}) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const dispatch = useDispatch();

    return (
        <div className={style.fan_box}>
            <div className={style.fan}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        setIsOpen(!isOpen);
                    }
                }}>
                <div className={style.fan_name}>{props.name}</div>
                <div className={style.fan_button}>
                    <img className={style.superfan} src={props.super_fans ? clickedsuperfan : superfan} alt='superfan' onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            if (props.id) {
                                dispatch(setSuperFan(props.id, props.searchtext, props.datesearch))
                            }
                        }
                    }} />
                    <img className={style.cross} src={cross} alt='ban fan' onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            if (props.id) {
                                dispatch(banFan(props.id, props.searchtext, props.datesearch))
                            }
                        }
                    }} />
                </div>
            </div>
            {isOpen ?
                <div className={style.activity_list}>
                    {props.activity[0] ? props.activity.map((activity, i) => <FanActivity created_at={activity.created_at} message={activity.message} key={i} />)
                        : <FanActivity created_at={''} message={'No activity yet'} />}
                </div> : null}
        </div>
    )
}