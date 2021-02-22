import reveal from '../../../button_img/reveal.svg'
import revealFalse from '../../../button_img/revealfalse.svg'

export interface RAC1Props {
    showPW: boolean
    altShowPW: () => void
    username: string
    password: string
    description: string
    onChangeUN: (username: string) => void
    onChangePassword: (password: string) => void
    onChangeDescription: (desc: string) => void
    onChangeEmail: (email: string) => void
    email: string
}

export default function RAC1(props: RAC1Props) {
    return (
        <div className="Register-1st">
            <div className="Register-input">
                <div className="register-input-heading">
                    <h6>用戶名稱:</h6>
                </div>
                <input type="text" name="username" placeholder="Username" value={props.username} onChange={(event) => props.onChangeUN(event.currentTarget.value)} />
            </div>
            <div className="Register-input password">
                <div className="register-input-heading">
                    <h6>密碼:</h6>
                </div>
                <input type={props.showPW ? 'text' : 'password'} placeholder="Password (8-12 characters)" minLength={8} maxLength={12} value={props.password} onChange={(event) => props.onChangePassword(event.currentTarget.value)} />
                <button type="button" onClick={props.altShowPW}><img src={props.showPW ? reveal : revealFalse} alt="" /></button>
            </div>
            <div className="Register-input">
                <div className="register-input-heading">
                    <h6>簡介:</h6>
                </div>
                <textarea name="description" maxLength={255} rows={4} placeholder="Description (255 characters max)" value={props.description} onChange={(event) => props.onChangeDescription(event.currentTarget.value)} />
            </div>
            <div className="Register-input">
                <div className="register-input-heading">
                    <h6>電郵:</h6>
                </div>
                <input type="email" name="email" placeholder="Email" value={props.email} onChange={(event) => props.onChangeEmail(event.currentTarget.value)} />
            </div>
        </div>
    )
}