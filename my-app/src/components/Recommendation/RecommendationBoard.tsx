import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomBoard } from '../../redux/Board/action'
import { RootState } from '../../redux/store'
import style from './RecommendationBoard.module.css'

export function RecommendationBoard() {
    const boardinfo = useSelector((state: RootState) => state.customBoard)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCustomBoard())
    }, [dispatch])
    return (
        <div className={style.box}>
            {/* {boardinfo.media ? <img src={`${process.env.REACT_APP_DO_SPACE_URL}/${boardinfo.media}`} className={style.img} alt=''></img> : null} */}
            {boardinfo.media ? <img src={`/creator_img/${boardinfo.media}`} className={style.img} alt=''></img> : null}
            <div >{boardinfo.description}</div>
        </div>
    )
}