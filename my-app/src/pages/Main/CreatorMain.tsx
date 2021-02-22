import React, { useEffect, useState } from 'react';
import board from '../../button_img/board.svg'
import edit from '../../button_img/edit.svg'
import style from './CreatorMain.module.css'
import { CalendarBoard } from '../../components/calendar/CalendarBoard';
import { FansBoard } from '../../components/FansBoard/FansBoard';
import { ProductBoard } from '../../components/Product/ProductBoard';
import { RecommendationBoard } from '../../components/Recommendation/RecommendationBoard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { EditCustomBoard } from '../../components/CustomBoard/EditCustomBoard';
import { fetchUser, updateBoardCategory } from '../../redux/CurUser/CurUSerAction';
import AddForm from '../AddPost/addPost'

export function CreatorMain() {
    const rightBoardIndex = useSelector((state: RootState)=> state.curUser.board_category)
    const [menuisOpen, setMenuIsOpen] = useState<Boolean>(false)
    const [customisOpen, setcustomisOpen] = useState<Boolean>(false)
    const boardinfo = useSelector((state: RootState) => state.customBoard)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchUser());
    },[dispatch])

    return (
        <div className="center-scroll-area">
            <div className={style.main}>
                <div className={style.left_board}>
                    <AddForm isCreator={true}/>
                </div>
                <div className={style.right_board}>
                    <div className={style.board_row}>
                        <img src={board} className={style.change_board_button} alt=''
                            onClick={() => {
                                setMenuIsOpen(!menuisOpen)
                            }}>
                        </img>
                        {menuisOpen &&
                            <div className={style.change_board}>
                                <div onClick={() => { setMenuIsOpen(false); dispatch(updateBoardCategory('calendar' , localStorage.getItem('token'))) }}>活動</div>
                                <div onClick={() => { setMenuIsOpen(false); dispatch(updateBoardCategory('products' , localStorage.getItem('token'))) }}>商店</div>
                                <div onClick={() => { setMenuIsOpen(false); dispatch(updateBoardCategory('fanList' , localStorage.getItem('token'))) }}>粉絲</div>
                                <div onClick={() => { setMenuIsOpen(false); dispatch(updateBoardCategory('custom' , localStorage.getItem('token'))) }}>自訂</div>
                            </div>
                        }
                        <div className={style.board_title}>
                            {rightBoardIndex  === 'calendar' ? '活動' :
                                rightBoardIndex === 'products' ? '商店' :
                                    rightBoardIndex === 'fanList' ? '粉絲' :
                                        rightBoardIndex === 'custom' ?
                                            <div className={style.custom}>
                                                <img src={edit} className={style.edit} alt='' onClick={() => { setcustomisOpen(!customisOpen)}} />
                                                {boardinfo.title}
                                            </div> :
                                            null
                            }
                        </div>
                        <div className={style.none}></div>
                    </div>
                    {customisOpen ? <EditCustomBoard ondone={()=>setcustomisOpen(!customisOpen)}/> :
                        rightBoardIndex === 'calendar' ? <CalendarBoard /> :
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