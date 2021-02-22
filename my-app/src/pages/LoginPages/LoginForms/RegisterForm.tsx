import React, { useState } from 'react'
import './RegisterForm.scss';
import RegAsFan from './RegAsFanForm'
import RegAsCreator from './RegAsCreatorForm'
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [register, setRegister] = useState('init');
 
    const altReg = (interfac: string) => {
        setRegister(interfac)
    }

    return (
        <div className="Login-Form-Container">
            <div className={register !== 'init' ? 'none' : 'flex Register-buttons-container'}>
                {/* Click={() => altReg('creator')} */}
                <Link to='/deployment' className="Register-buttons">創作人註冊</Link>
                {/* <button className="Register-buttons" onClick={() => altReg('creator')}>創作人註冊</button> */}
                <button className="Register-buttons" onClick={() => altReg('fan')}>粉絲註冊</button>
            </div>
            <div className={register === 'init' ? 'none' : 'flex'}>
                {register === 'creator' && <RegAsCreator onCLick={() => altReg('init')} />}
                {register === 'fan' && <RegAsFan onCLick={() => altReg('init')} />}
            </div>
        </div>
    )
}