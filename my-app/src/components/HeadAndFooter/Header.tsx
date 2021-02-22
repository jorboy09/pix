import style from './Header.module.css'
import { Link, /*Route, Switch*/ } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { fetchFan, fetchUser } from '../../redux/CurUser/CurUSerAction';

export function Header() {
    const isCreator = useSelector((state: RootState) => state.login.isCreator);
    const curUser = useSelector((state: RootState) => state.curUser);
    const themes = useSelector((state: RootState) => state.curUser.TA);
    const [bigHeadMak, setBigHeadMak] = useState<string | null>('');
    const [bgImg, setBGImg] = useState<string | null>('');
    const dispatch = useDispatch();

    const dispatchLogOut = () => {
        localStorage.removeItem('token');
        dispatch({
            type: '@@/LoginAction/LOGOUT'
        })
    }

    const throwaway = () => { }

    useEffect(() => {
        dispatch(fetchUser());
        if (isCreator !== false) {
            dispatch(fetchFan(localStorage.getItem('token')))
        }
    }, [dispatch, isCreator])

    // import(`${process.env.REACT_APP_DO_SPACE_URL}/${curUser.profile_pic}`)
    //     .then(image => setBigHeadMak(image.default))
    //     .catch(() => setBigHeadMak(null))
    // import(`${process.env.REACT_APP_DO_SPACE_URL}/${curUser.cover_pic}`)
    //     .then(image => setBGImg(image.default))
    //     .catch(() => setBGImg(null))
    import(`../../../public/creator_img/${curUser.profile_pic}`)
        .then(image => setBigHeadMak(image.default))
        .catch(() => setBigHeadMak(null))
    import(`../../../public/creator_img/${curUser.cover_pic}`)
        .then(image => setBGImg(image.default))
        .catch(() => setBGImg(null))

    return (
        <div className={style.header} style={{
            // backgroundImage: `url(${process.env.REACT_APP_DO_SPACE_URL}/${curUser.cover_pic})`
            backgroundImage: `url(${bgImg})`
        }}>
            <div className={style.channel_name} style={{
                backgroundColor: themes[curUser.colour_theme][1].colour,
                color: themes[curUser.colour_theme][3].colour
            }}>
                {curUser.username}
            </div>
            <div className={style.channel_icon} style={{
                // backgroundImage: `url(${process.env.REACT_APP_DO_SPACE_URL}/${curUser.profile_pic})`
                backgroundImage: `url(${bigHeadMak})`
            }}></div>
            <div className={style.channel_description} style={{
                backgroundColor: themes[curUser.colour_theme][3].colour,
                color: themes[curUser.colour_theme][1].colour
            }}><span>{curUser.description}</span></div>
            <Link to="/loginPage">
                <button className={style.login}
                    onClick={localStorage.getItem('token') !== null ?
                        dispatchLogOut :
                        throwaway
                    }>
                    {localStorage.getItem('token') === null ?
                        '登入' :
                        isCreator ?
                            '創作人登出' :
                            '粉絲登出'
                    }
                </button>
            </Link>
        </div>
    )
}