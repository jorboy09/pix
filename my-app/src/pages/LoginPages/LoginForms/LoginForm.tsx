import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login, loginFan } from '../../../redux/Login/LoginAction';
import reveal from '../../../button_img/reveal.svg'
import revealFalse from '../../../button_img/revealfalse.svg'
import '../LoginPage.scss';

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPW, setShowPw] = useState(false);
    const [showPWFan, setShowPwFan] = useState(false);
    const [usernameFan, setUsernameFan] = useState('')
    const [passwordFan, setPasswordFan] = useState('')
    const dispatch = useDispatch();

    return (
        <div className="Login-Form-Container">
            <div className="Login-Form">
                <div className="Login-Form-Heading">
                    <h4>管理員登入</h4>
                </div>
                <form action="" className="form" onSubmit={(event) => {
                    event.preventDefault();
                    dispatch(login(username, password));
                }}>
                    <input type="text" name="username" placeholder="用戶名稱" onChange={(event) => setUsername(event.currentTarget.value)} value={username} />
                    <div className="pw-container">
                        <input type={showPW ? "text" : "password"} name="password" placeholder="用戶密碼" onChange={(event) => setPassword(event.currentTarget.value)} value={password} />
                        <button type="button" onClick={() => setShowPw(!showPW)}><img src={showPW ? reveal : revealFalse} alt="" /></button>
                    </div>
                    <label htmlFor="submit-login-creator">
                        <div className="submit-login-button-container">
                            <button className="submit-login-button">
                                登入
                            </button>
                        </div>
                    </label>
                    <input type="submit" className="hidden" id="submit-login-creator"/>
                </form>
            </div>
            <div className="Login-Form-Fan">
                <div className="Login-Form-Heading">
                    <h4>粉絲登入</h4>
                </div>
                <form action="" className="form" onSubmit={(event) => {
                    event.preventDefault();
                    dispatch(loginFan(usernameFan, passwordFan));
                }}>
                    <input type="text" name="username" placeholder="用戶名稱" onChange={(event) => setUsernameFan(event.currentTarget.value)} value={usernameFan} />
                    <div className="pw-container">
                        <input type={showPWFan ? "text" : "password"} name="password" placeholder="用戶密碼" onChange={(event) => setPasswordFan(event.currentTarget.value)} value={passwordFan} />
                        <button type="button" onClick={() => setShowPwFan(!showPWFan)}><img src={showPWFan ? reveal : revealFalse} alt="" /></button>
                    </div>
                    <label htmlFor="submit-login-fan">
                        <div className="submit-login-button-container">
                            <button className="submit-login-button">
                                登入
                            </button>
                        </div>
                    </label>
                    <input type="submit" className="hidden" id="submit-login-fan"/>
                </form>
            </div>
        </div>
    )
}