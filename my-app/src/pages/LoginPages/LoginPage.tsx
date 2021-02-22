import React, { useState } from 'react';
//import { Link } from 'react-router-dom'
import './LoginPage.scss'
import LoginForm from './LoginForms/LoginForm';
import RegisterForm from './LoginForms/RegisterForm';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export default function LoginPage() {
    const [log, setLog] = useState(true)
    const dispatch = useDispatch()

    const changeLog = (isLog: boolean) => {
        setLog(isLog);
    }

    return (
        <div className="center">
            <div className={log ? 'Login-bg' : 'Reg-bg'}>
                <div className="Login-buttons">
                    <button className={log ?
                        'invis button' :
                        'Login button'
                    } onClick={() => changeLog(true)}>登入</button>
                    <button className={!log ?
                        'invis button' :
                        'Register button'
                    } onClick={() => changeLog(false)}>註冊</button>
                </div>
                <div className="form-container">
                    {log === true ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    )
}