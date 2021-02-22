import { useState } from 'react'
import pen from '../../../button_img/pen.svg'
// import { SliderPicker } from 'react-color'

export interface RAC2Props {
    colour_theme: number
    onChangePFP: (pfp: File | null) => void
    onChangeCVP: (cvp: File | null) => void
    onChangeCT: (ct: number) => void
}

export default function RAC2(props: RAC2Props) {
    const [profile, setProfile] = useState<String | null>(null)
    const [cover, setCover] = useState<String | null>(null)
    const noImage: String = '../../../temp_img/no image.jpg';
    const noCover: String = '../../../temp_img/noCover.jpg';

    return (
        <div className="Reg-2nd">
            <div className="Register-input profile">
                <div className="register-input-heading">
                    <h6>個人照</h6>
                </div>
                <div className="profile-pic" style={profile !== null ? {
                    backgroundImage: `url(${profile})`
                } : {
                    backgroundImage: `url(${noImage})`
                }}>
                    <label htmlFor="profpic" className="profile-dialog">
                        <img src={pen} alt="" />
                    </label>
                </div>
                <input type="file" id="profpic" className="hidden"
                    onChange={(event) => {
                        if (event.currentTarget.files !== null){
                            props.onChangePFP((event.currentTarget.files[0]));
                            setProfile(URL.createObjectURL(event.currentTarget.files[0]))
                    }}}
                    formEncType="multipart/form-data" />
            </div>
            <div className="Register-input">
                <div className="cover">
                    <div className="register-input-heading">
                        <h6>背景圖:</h6>
                    </div>
                    <div className="cover-pic" style={cover !== null ? {
                        backgroundImage: `url(${cover})`
                    } : {
                        backgroundImage: `url(${noCover})`
                    }}>
                        <label htmlFor="covpic" className="profile-dialog">
                            <img src={pen} alt="" />
                        </label>
                    </div>
                    <input type="file" id="covpic" className="hidden"
                        onChange={(event) => {
                            if (event.currentTarget.files !== null){
                                props.onChangeCVP((event.currentTarget.files[0]));
                                setCover(URL.createObjectURL(event.currentTarget.files[0]))
                        }}}
                        formEncType="multipart/form-data"
                    />
                </div>
            </div>
            {/* <div className="Register-input choix-de-coleur">
                <div className="register-input-heading">
                    <h6>Colour Theme:</h6>
                </div>
                <div className="all-colours">
                    {themes.map((theme, index) => {
                        return (
                            <div className="colours" onClick={() => props.onChangeCT(index)} >
                                {theme.map((colour, i) => {
                                    return (
                                        <div className="colour" style={{ backgroundColor: colour.colour }}></div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div> */}
        </div>
    )
}