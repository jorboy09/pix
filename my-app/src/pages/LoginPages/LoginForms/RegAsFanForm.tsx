import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import reveal from '../../../button_img/reveal.svg'
import revealFalse from '../../../button_img/revealfalse.svg'
import { fanRegister } from '../../../redux/Login/RegisterAction';

export interface RAFProps {
    onCLick: () => void
}

export default function RegAsFan(props: RAFProps) {
    const [showPW, setShowPw] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [description, setdescription] = useState('');
    const dispatch = useDispatch();
    const altShowPW = () => {
        setShowPw(!showPW)
    }

    return (
        <div className="Regis-container">
            <div className="Back-button-container">
                <button onClick={props.onCLick} className="Back-button">返回</button>
            </div>
            <div className="Register-Form">
                <form action="" onSubmit={() => {
                    dispatch(fanRegister(
                        username,
                        password,
                        description
                    ))
                }}>
                    <div className="Register-input">
                        <input type="text" name="username" id="" placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
                    </div>
                    <div className="Register-input password">
                        <input type={showPW ? 'text' : 'password'} placeholder="Password (8-12 characters)" minLength={8} maxLength={12} value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
                        <button type="button" onClick={altShowPW}><img src={showPW ? reveal : revealFalse} alt="" /></button>
                    </div>
                    <div className="Register-input">
                        <textarea name="description" maxLength={255} rows={4} placeholder="Description (255 characters max)" value={description} onChange={(event) => setdescription(event.currentTarget.value)} />
                    </div>
                    <div className="Register-input">
                        <label htmlFor="Reg-As-Fan-submit">
                            <div>
                                <button>
                                    註冊
                                </button>
                            </div>
                        </label>
                        <input type="submit" id="Reg-As-Fan-submit" className="none"/>
                    </div>
                </form>
            </div>
        </div>
    )
}