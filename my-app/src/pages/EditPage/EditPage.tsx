import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { themes } from '../../redux/Login/RegisterReducer'
import reveal from '../../button_img/reveal.svg'
import revealFalse from '../../button_img/revealfalse.svg'
import './EditPage.scss'
import { RootState } from '../../redux/store';
import up from '../../button_img/upload.svg'
import {
    editPassword,
    editDescription,
    editProfilePic,
    editCoverPic,
    editColourTheme,
    invertTheme
} from '../../redux/Edit/EditAction';
import { fetchUser } from '../../redux/CurUser/CurUSerAction';

export default function EditPage() {
    const inverted = useSelector((state: RootState) => state.curUser.colourInvert)
    const curUserColour = useSelector((state: RootState) => state.curUser.colour_theme)
    const username = useSelector((state: RootState) => state.curUser.username)
    const profilePic = useSelector((state: RootState) => state.curUser.profile_pic)
    const coverPic = useSelector((state: RootState) => state.curUser.cover_pic)
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const [password, setPassword] = useState<string>('')
    const [showPW, setShowPW] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [pfp, setPFP] = useState<File | null>(null)
    const [cvp, setCVP] = useState<File | null>(null)
    const [colour_theme, setCT] = useState<number | null>(null)
    const [profile, setProfile] = useState<String | null>(null)
    const [cover, setCover] = useState<String | null>(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(localStorage.getItem('token')));
        setProfile(`${process.env.REACT_APP_DO_SPACE_URL}/${profilePic}`);
        setCover(`${process.env.REACT_APP_DO_SPACE_URL}/${coverPic}`)
        //setProfile(`/creator_img/${profilePic}`);
        //setCover(`/creator_img/${coverPic}`)
    }, [dispatch])

    return (
        <div className="edit-container">
            <div className='title' style={{
                color: themes[curUserColour][3].colour
            }}>編輯帳戶資料</div>
            <div className="edit-form">
                <div className="edit-form-one">
                    <div className="edit-input">
                        <form action="" onSubmit={(event) => {
                            const token = localStorage.getItem('token')
                            if (username !== null) dispatch(editPassword(username, password, token))
                            setPassword('')
                        }}>
                            <div style={{
                                color: themes[curUserColour][0].colour
                            }}>
                                <h5>更改密碼</h5>
                                <div className="password-edit">
                                    <input type={showPW ? 'text' : 'password'} name="password" id="password"
                                        value={password} onChange={(event) => setPassword(event.currentTarget.value)}
                                    />
                                    <button type="button" onClick={() => setShowPW(!showPW)}>
                                        <img src={showPW ? reveal : revealFalse} alt="" />
                                    </button>
                                </div>
                            </div>
                            <input type="submit" />
                        </form>
                    </div>
                    <div className="edit-input">
                        <form action="" onSubmit={(event) => {
                            const token = localStorage.getItem('token')
                            if (username !== null) dispatch(editDescription(username, description, token))
                            setDescription('')
                        }}>
                            <div style={{
                                color: themes[curUserColour][0].colour
                            }}>
                                <h5>編輯簡介</h5>
                                <textarea name="description" id="description" rows={4} maxLength={255}
                                    value={description} onChange={event => setDescription(event.currentTarget.value)}
                                />
                            </div>
                            <input type="submit" />
                        </form>
                    </div>
                    <div className="edit-input">
                        <form action="" className="colour-form" onSubmit={(event) => {
                            const token = localStorage.getItem('token')
                            if (username !== null && colour_theme !== null) dispatch(editColourTheme(username, `${colour_theme}`, token))
                            setCT(null);
                        }}>
                            <h5 style={{
                                color: themes[curUserColour][0].colour
                            }}>編輯主題</h5>
                            <div className="all-colours">
                                {themes.map((theme, index) => {
                                    return (
                                        <div className="colours" onClick={() => setCT(index)} >
                                            {theme.map((colour, i) => {
                                                return (
                                                    <div className="colour" style={{ backgroundColor: colour.colour }}></div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                            <input type="submit" id="colour-submit" />
                        </form>
                    </div>
                </div>
                <div className="edit-form-two">
                    <div className="edit-input">
                        <form action="" onSubmit={(event) => {
                            let form = new FormData();
                            if (username !== null) {
                                form.append('username', username)
                            }
                            if (pfp !== null) {
                                form.append('pfp', pfp)
                            }
                            const token = localStorage.getItem('token')
                            dispatch(editProfilePic(form, token))
                            setPFP(null)
                        }}>
                            <h5 style={{
                                color: themes[curUserColour][0].colour
                            }}>更改頭像</h5>
                            <div className="absolute">
                                <label htmlFor="edit-profile">
                                    <div className="edit-profile-pic" style={{
                                        backgroundImage: `url(${profile})`,
                                        color: themes[curUserColour][0].colour
                                    }}>Click to edit</div>
                                </label>
                                <label htmlFor="edit-profile-submit">
                                    <button className="edit-profile-dialog">
                                        <img src={up} alt="" />
                                    </button>
                                </label>
                            </div>
                            <input type="file" name="profile" id="edit-profile"
                                className="none"
                                onChange={event => {
                                    if (event.currentTarget.files !== null) {
                                        setPFP(event.currentTarget.files[0]);
                                        setProfile(URL.createObjectURL(event.currentTarget.files[0]))
                                    }
                                }}
                            />
                            <input type="submit" id="edit-profile-submit" className="none" />
                        </form>
                    </div>
                    <div className="edit-input">
                        <form action="" className="edit-cover-form" onSubmit={(event) => {
                            let form = new FormData();
                            if (username !== null) {
                                form.append('username', username)
                            }
                            if (cvp !== null) {
                                form.append('cvp', cvp)
                            }
                            const token = localStorage.getItem('token')
                            dispatch(editCoverPic(form, token))
                            setCVP(null)
                        }}>
                            <h5 style={{
                                color: themes[curUserColour][0].colour
                            }}>更改橫幅</h5>
                            <div className="absolute">
                                <label htmlFor="edit-cover">
                                    <div className="edit-cover-pic" style={{
                                        backgroundImage: `url(${cover})`,
                                        color: themes[curUserColour][0].colour
                                    }}>Click to edit</div>
                                </label>
                                <label htmlFor="edit-cover-submit">
                                    <button className="edit-cover-dialog">
                                        <img src={up} alt="" />
                                    </button>
                                </label>
                            </div>
                            <input type="file" name="cover" id="edit-cover"
                                className="none"
                                onChange={event => {
                                    if (event.currentTarget.files !== null) {
                                        setCVP(event.currentTarget.files[0]);
                                        setCover(URL.createObjectURL(event.currentTarget.files[0]))
                                    }
                                }}
                            />
                            <input type="submit" name="" id="edit-cover-submit" className="none"/>
                        </form>
                    </div>
                    <div className="edit-input">
                        <form action="" onSubmit={() => {
                            const token = localStorage.getItem('token')
                            if (username !== null) dispatch(invertTheme(username, !inverted, token))
                        }}>
                            <h5 style={{
                                color: themes[curUserColour][0].colour
                            }}>調轉顏色</h5>
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}