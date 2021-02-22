

export interface RAC4Props {
    domain: string
    api: string
    onChangeDomain: (domain: string) => void
    onChangeAPI: (api: string) => void
}

export default function RegisterAsCreator4(props: RAC4Props) {
    return (
        <div className="hyperlink-form-container">
            <div className="Register-input hyperlink-input">
                <div className="register-input-heading">
                    <h4>專頁網址:</h4>
                </div>
                <input
                    type="text"
                    name=""
                    id="hyperlink-domain"
                    value={props.domain}
                    onChange={event => props.onChangeDomain(event.currentTarget.value)}
                />
            </div>
            <div className=" Register-input hyperlink-input">
                <div className="register-input-heading">
                    <h4>Droplets 網址:</h4>
                </div>
                <input
                    type="text"
                    name=""
                    id="hyperlink-api"
                    value={props.api}
                    onChange={event => props.onChangeAPI(event.currentTarget.value)}
                />
            </div>
        </div>
    )
}