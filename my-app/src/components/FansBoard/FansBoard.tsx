import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFanList } from '../../redux/fanlist/action';
import { RootState } from '../../redux/store';
import style from './FansBoard.module.css'
import { FansBoardFans } from './FansBoard_Fans';

export function FansBoard() {
    const fanList = useSelector((state: RootState) => state.fanList.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFanList('', 'NaN-NaN-NaN'))
    }, [dispatch])

    return (
        <div className={style.fans_board}>
            <div className={style.fans_list}>
                {fanList.map((fan, i) => <FansBoardFans name={fan.name} superfan={fan.super_fans} key={i} />)}
            </div>
        </div>
    )
}