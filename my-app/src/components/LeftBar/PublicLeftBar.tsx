import './LeftBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootState } from '../../redux/store';

export function PublicLeftBar() {
    const isLoggedinFan = useSelector((state: RootState) => state.curFan.id)

    const dispatch = useDispatch()

    return (
        <div className="left-bar">
            <button onClick={() => dispatch(push("/main"))}><i className="fas fa-home"></i><p>主頁</p></button>
            <button onClick={() => dispatch(push("/onlinestore"))}><i className="fas fa-store"></i><p>商店</p></button>
            <button onClick={() => dispatch(push("/fanszone"))}><i className="far fa-comments"></i><p>留言板</p></button>
            <button onClick={() => dispatch(push("/calendar"))}><i className="far fa-calendar-alt"></i><p>活動</p></button>
            { isLoggedinFan &&
                <button onClick={() => dispatch(push("/inbox"))}><i className="fas fa-glass-cheers"></i><p>聊天室</p></button>
            }
            <button onClick={() => dispatch(push("/contact"))}><i className="far fa-address-book"></i><p>聯絡我們</p></button>
        </div>

    )
}