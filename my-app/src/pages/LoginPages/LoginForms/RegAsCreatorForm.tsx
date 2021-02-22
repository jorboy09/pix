import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { creatorRegister } from '../../../redux/Login/RegisterAction';
// import reveal from '../../../button_img/reveal.svg'
// import revealFalse from '../../../button_img/revealfalse.svg'
// import pen from '../../../button_img/pen.svg'
import RAC1 from './RegAsCreatorForm1'
import RAC2 from './RegAsCreatorForm2'
import RegisterAsCreator3 from './RegAsCreatorForm3'
import RegisterAsCreator4 from './RegAsCreatorForm4'
// import { SliderPicker } from 'react-color'

export interface RACProps {
    onCLick: () => void
}

export default function RegAsCreator(props: RACProps) {
    const [showPW, setShowPw] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [pfp, setPFP] = useState<File | null>(null);
    const [cvp, setCVP] = useState<File | null>(null);
    const [ct, setCT] = useState(0);
    const [domain, setDomain] = useState<string>('');
    const [api, setAPI] = useState<string>('');
    const [page, setPage] = useState(1);
    // const [mess, setMessage] = useState<'fine' | 'missing'>('fine');
    const dispatch = useDispatch();
    const altShowPW = () => {
        setShowPw(!showPW)
    }

    const altPage = (interfac: 1 | 2 | 3 | 4) => {
        setPage(interfac)
    }

    const convertToURL = (file: File | null) => {
        if (file !== null) {
            return URL.createObjectURL(file)
        } else {
            return null
        }
    }

    return (
        <div className="center">
            <div className="Reg-bg">
                <div className="form-container">
                    <div className="Regis-container">
                        <div className="Back-button-container">
                            <button onClick={
                                page === 1 ?
                                    props.onCLick :
                                    page === 2 ?
                                        () => altPage(1) :
                                        // page === 3 ?
                                            () => altPage(2) 
                                            // () => altPage(3)
                            }
                                className="Back-button">
                                返回
                            </button>
                            <div style={{
                                marginTop: 15 + `px`
                            }}>
                                <h3>創作人註冊({page}/4)</h3>
                            </div>
                        </div>
                        <div className="Register-Form">
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                let form = new FormData();
                                form.append('username', username);
                                form.append('password', password);
                                form.append('description', description);
                                form.append('email', email);
                                console.log(pfp, cvp)
                                if (pfp) {
                                    form.append('pfp', pfp)
                                    console.log('pfp success')
                                };
                                if (cvp) {
                                    form.append('cvp', cvp)
                                    console.log('cvp success')
                                };
                                form.append('ct', `${ct}`)
                                form.append('domain', domain)
                                form.append('api', api)
                                dispatch(creatorRegister(form))
                            }}>
                                {
                                    page === 1 ?
                                        <RAC1
                                            username={username}
                                            onChangeUN={setUsername}
                                            password={password}
                                            onChangePassword={setPassword}
                                            showPW={showPW}
                                            altShowPW={altShowPW}
                                            description={description}
                                            onChangeDescription={setDescription}
                                            email={email}
                                            onChangeEmail={setEmail}
                                        /> :
                                        page === 2 ?
                                            <RAC2
                                                onChangePFP={setPFP}
                                                onChangeCVP={setCVP}
                                                colour_theme={ct}
                                                onChangeCT={setCT}
                                            /> :
                                            // page === 3 ?
                                                <RegisterAsCreator3
                                                    colour_theme={ct}
                                                    onChangeCT={setCT}
                                                    pfp={convertToURL(pfp)}
                                                    cvp={convertToURL(cvp)}
                                                />
                                                // <RegisterAsCreator4
                                                //     domain={domain}
                                                //     api={api}
                                                //     onChangeDomain={setDomain}
                                                //     onChangeAPI={setAPI}
                                                // />
                                }
                                {page === 1 &&
                                    <div className="Register-input subby">
                                        <button className="submit-button" onClick={() => altPage(2)}>
                                            繼續
                                        </button>
                                    </div>
                                }
                                {page === 2 &&
                                    <div className="Register-input subby">
                                        <button className="submit-button" onClick={() => altPage(3)}>
                                            繼續
                                        </button>
                                    </div>
                                }
                                {/* {page === 3 &&
                                    <div className="Register-input subby">
                                        <button className="submit-button" onClick={() => altPage(4)}>
                                            繼續
                                        </button>
                                    </div>
                                } */}
                                {page === 3 &&
                                    <div className="Register-input subby">
                                        <label htmlFor="sub" >
                                <button className="submit-button">Submit</button>
                            </label>
                                        {/*<Link to='/deployment' className="Register-buttons">創作人註冊</Link>*/}
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}