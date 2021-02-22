import React, { useEffect } from 'react';
import style from './CreatorMain.module.css'
import { CalendarBoard } from '../../components/calendar/CalendarBoard';
import { FansBoard } from '../../components/FansBoard/FansBoard';
import { ProductBoard } from '../../components/Product/ProductBoard';
import { RecommendationBoard } from '../../components/Recommendation/RecommendationBoard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchFan, fetchFans, fetchUser } from '../../redux/CurUser/CurUSerAction';
import AddForm from '../AddPost/addPost'

export function PublicMain() {
    const rightBoardIndex = useSelector((state: RootState) => state.curUser.board_category)
    const boardinfo = useSelector((state: RootState) => state.customBoard)
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(fetchFans())
        if (token !== null) {
            dispatch(fetchFan(token))
        }

        dispatch(fetchUser())
    }, [dispatch, ])

    return (
        <div className="center-scroll-area">
            <div className={style.main}>
                <div className={style.left_board}>
                    <AddForm isCreator={false}/>
                </div>
                <div className={style.right_board}>
                    <div className={style.board_row}>
                        <div className={style.board_title}>
                            {rightBoardIndex === 'calendar' ? '活動' :
                                rightBoardIndex === 'products' ? '商店' :
                                    rightBoardIndex === 'fanList' ? '粉絲' :
                                        rightBoardIndex === 'custom' ?
                                            <div className={style.custom}>
                                                {boardinfo.title}
                                            </div> : null
                            }
                        </div>
                    </div>
                    {rightBoardIndex === 'calendar' ? <CalendarBoard /> :
                        rightBoardIndex === 'products' ? <ProductBoard /> :
                            rightBoardIndex === 'fanList' ? <FansBoard /> :
                                rightBoardIndex === 'custom' ? <RecommendationBoard /> :
                                    null
                    }
                </div>
            </div>
        </div>
    )
}