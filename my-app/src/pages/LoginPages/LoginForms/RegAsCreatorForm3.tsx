import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

interface RAC3Props {
    colour_theme: number
    pfp: String | null
    cvp: String | null
    onChangeCT: (ct: number) => void
}

export default function RegisterAsCreator3(props: RAC3Props) {
    const themes = useSelector((state: RootState) => state.curUser.TA)

    return (
        <div className="Register-colours-container">
            <div className="Register-input choix-de-coleur">
                <div className="register-input-heading">
                    <h6>主題顏色:</h6>
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
            </div>
            <div className="colour-preview-container"> {/* fake page for preview */}
                <div className="mock-header" style={{
                    backgroundImage: `url(${props.cvp})`
                }}>
                    <div className="mock-header-components">
                        <div className="mock-profile" style={{
                            backgroundImage: `url(${props.pfp})`
                        }}>

                        </div>
                        <div className="mock-descripts">
                            <div className="mock-username" style={{
                                backgroundColor: themes[props.colour_theme][1].colour,
                                color: themes[props.colour_theme][3].colour
                            }}>
                                xxxxxxxx
                            </div>
                            <div className="mock-description" style={{
                                backgroundColor: themes[props.colour_theme][3].colour,
                                color: themes[props.colour_theme][1].colour
                            }}>
                                xxxxxxxxxxxxxxxxx
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mock-body" style={{
                    background: `linear-gradient(to right top, ${themes[props.colour_theme][2].colour
                        }, ${themes[props.colour_theme][0].colour
                        })`,
                    opacity: 1
                }}>
                    <div className="mock-main" style={{
                        background: `linear-gradient(to right bottom, ${themes[props.colour_theme][4].colour
                            }, ${themes[props.colour_theme][2].colour
                            })`,
                        opacity: 0.8
                    }}>
                        <div className="mock-left-bar" style={{ backgroundColor: themes[props.colour_theme][4].colour }}>
                            <div style={{ color: themes[props.colour_theme][0].colour }}>xxxxx</div>
                            <div style={{ color: themes[props.colour_theme][0].colour }}>xxxxx</div>
                            <div style={{ color: themes[props.colour_theme][0].colour }}>xxxxx</div>
                            <div style={{ color: themes[props.colour_theme][0].colour }}>xxxxx</div>
                            <div style={{ color: themes[props.colour_theme][0].colour }}>xxxxx</div>
                        </div>
                        <div className="mock-right-main" >

                        </div>
                    </div>
                </div>
                <div className="mock-footer">

                </div>
            </div>
        </div>
    )
}