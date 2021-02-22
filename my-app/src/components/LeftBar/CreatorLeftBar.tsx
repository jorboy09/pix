import '../../App/rootColor.css'
import { useDispatch, useSelector } from 'react-redux';
import './LeftBar.css'
import { RootState } from '../../redux/store';

import { push } from 'connected-react-router';

export function CreatorLeftBar() {
    const curUserColour = useSelector((state: RootState) => state.curUser.colour_theme);
    const themes = useSelector((state: RootState) => state.themes.TA)
    const dispatch = useDispatch();


    return (
        <div>
            <div className="left-bar creator-left-bar " style={{ backgroundColor: themes[curUserColour][4].colour }}>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/main"))}><i className="fas fa-home"></i><p>主頁</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/onlinestore"))}><i className="fas fa-store"></i><p>商店</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/fanszone"))}><i className="far fa-comments"></i><p>留言板</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/calendar"))}><i className="far fa-calendar-alt"></i><p>活動</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/creator-fansmanagement"))}><i className="fas fa-user-edit"></i><p>粉絲管理</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/inbox"))}><i className="fas fa-glass-cheers"></i><p>聊天室</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/contact"))}><i className="far fa-address-book"></i><p>聯絡我們</p></button>
                <button style={{ color: themes[curUserColour][0].colour }} onClick={() => dispatch(push("/edit"))}><i className="fas fa-cog"></i><p>設定</p></button>
            </div>

        </div>
    )
}