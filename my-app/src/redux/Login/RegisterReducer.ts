import { RegisterAction } from "./RegisterAction"
import {RSResponse, RSMessage, UhOh} from './RegisterAction'

export const themesArray: { colour: string, number: number }[][] = [
    [
        { colour: '#DE354C', number: 1 },
        { colour: '#932432', number: 2 },
        { colour: '#3C1874', number: 3 },
        { colour: '#283747', number: 4 },
        { colour: '#F3F3F3', number: 5 },
    ],
    [
        { colour: '#B73225', number: 1 },
        { colour: '#004E7C', number: 2 },
        { colour: '#591COB', number: 3 },
        { colour: '#5C5F58', number: 4 },
        { colour: '#DCE1E3', number: 5 },
    ],
    [
        { colour: '#DDAF94', number: 1 },
        { colour: '#E8CEBF', number: 2 },
        { colour: '#266150', number: 3 },
        { colour: '#4F4846', number: 4 },
        { colour: '#FDF8F5', number: 5 },
    ],
    [
        { colour: '#12232E', number: 1 },
        { colour: '#007CC7', number: 2 },
        { colour: '#4DA8DA', number: 3 },
        { colour: '#203647', number: 4 },
        { colour: '#EEFBFB', number: 5 },
    ],
    [
        { colour: '#202020', number: 1 },
        { colour: '#3F3F3F', number: 2 },
        { colour: '#707070', number: 3 },
        { colour: '#FFDF6C', number: 4 },
        { colour: '#FFFFFF', number: 5 },
    ],
    [
        { colour: '#164A41', number: 1 },
        { colour: '#4D774E', number: 2 },
        { colour: '#9DC88D', number: 3 },
        { colour: '#F1B24A', number: 4 },
        { colour: '#FFFFFF', number: 5 },
    ],
    [
        { colour: '#A3BCB6', number: 1 },
        { colour: '#39603D', number: 2 },
        { colour: '#3C403D', number: 3 },
        { colour: '#DADED4', number: 4 },
        { colour: '#FFFFFF', number: 5 },
    ],
    [
        { colour: '#111111', number: 1 },
        { colour: '#00ACFE', number: 2 },
        { colour: '#0A77DE', number: 3 },
        { colour: '#FF883B', number: 4 },
        { colour: '#36D6FE', number: 5 }
    ],
    [
        { colour: '#997055', number: 1 },
        { colour: '#FFCF00', number: 2 },
        { colour: '#E7D6C6', number: 3 },
        { colour: '#EAEBEF', number: 4 },
        { colour: '#8A96A1', number: 5 },
    ],
    [
        { colour: '#234042', number: 1 },
        { colour: '#0A1516', number: 2 },
        { colour: '#7BC6D1', number: 3 },
        { colour: '#F5AE60', number: 4 },
        { colour: '#FC9F4A', number: 5 },
    ],
    [
        { colour: '#1D3557', number: 1 },
        { colour: '#457B9D', number: 2 },
        { colour: '#A8DADC', number: 3 },
        { colour: '#E63946', number: 4 },
        { colour: '#F1FAEE', number: 5 },
    ],
    [
        { colour: '#051E28', number: 1 },
        { colour: '#18056E', number: 2 },
        { colour: '#483DF6', number: 3 },
        { colour: '#4C23C2', number: 4 },
        { colour: '#40B5BC', number: 5 },
    ],
    [
        { colour: '#FF0659', number: 1 },
        { colour: '#FF6AA1', number: 2 },
        { colour: '#FFBBEF', number: 3 },
        { colour: '#27A973', number: 4 },
        { colour: '#C7F0EE', number: 5 },
    ],
    [
        { colour: '#090D0E', number: 1 },
        { colour: '#4D3020', number: 2 },
        { colour: '#944B29', number: 3 },
        { colour: '#D62625', number: 4 },
        { colour: '#E9DDCB', number: 5 },
    ],
    [
        { colour: '#33044A', number: 1 },
        { colour: '#E80459', number: 2 },
        { colour: '#2FBAD1', number: 3 },
        { colour: '#D7F3F7', number: 4 },
        { colour: '#FFFEFF', number: 5 },
    ],
    [
        { colour: '#408358', number: 1 },
        { colour: '#F1414C', number: 2 },
        { colour: '#44243C', number: 3 },
        { colour: '#319CBE', number: 4 },
        { colour: '#F76647', number: 5 },
    ],
]

export const colourInvert = (hexcode: string) => {
    const hexademicals = [
        { 'letter': 'A', 'value': 10 },
        { 'letter': 'B', 'value': 11 },
        { 'letter': 'C', 'value': 12 },
        { 'letter': 'D', 'value': 13 },
        { 'letter': 'E', 'value': 14 },
        { 'letter': 'F', 'value': 15 },
    ]
    const rawHC = hexcode.slice(1);
    const r = 255 - parseInt(rawHC.substr(0, 2), 16);
    const g = 255 - parseInt(rawHC.substr(2, 2), 16);
    const b = 255 - parseInt(rawHC.substr(4, 2), 16);
    const a = [r, g, b]
    let IHC = '#';
    a.forEach(c => {
        let x: number | string, y: number | string
        x = Math.floor(c / 16);
        y = c % 16;
        hexademicals.forEach(h => {
            if (x === h.value) {
                x = h.letter;
            }
            if (y === h.value) {
                y = h.letter;
            }
        })
        IHC += `${x}${y}`;
    })
    return IHC;

}
export interface successResponse {
    result: RSResponse
}
export interface failResponse {
    result: RSResponse,
    reason: RSMessage
}
export interface colossalFailure {
    result: RSResponse
    problem: UhOh
}

export interface RegisterInfo {
    reason: failResponse['reason'] | colossalFailure['problem'] | null,
    username: string | null,
    password: string | null,
    description: string | null,
    profile_pic: any
    cover_pic: any
    email: string | null,
    colour_theme: number
    colourInverted: boolean
}

const initialRegForm: RegisterInfo = {
    reason: null,
    username: null,
    password: null,
    description: null,
    profile_pic: null,
    cover_pic: null,
    email: null,
    colour_theme: 0,
    colourInverted: false
}

export const RegisterReducer = (state: RegisterInfo = initialRegForm, action: RegisterAction) => {
    if (action.type === '@@/RegisterService/REGISTER_FAIL') {
        return {
            ...state,
            reason: action.reason
        }
    }
    if (action.type === '@@/RegisterService/REGISTER_SUCCESS') {
        const payload = action.payload;
        return {
            ...state,
            reason: null,
            username: payload.username,
            password: payload.password,
            description: payload.description,
            profile_pic: action.pfp,
            cover_pic: action.cvp,
            email: payload.email,
            colour_theme: payload.colour_theme,
            colourInvert: payload.color_inverted
        }
    }
    return {
        ...state
    }
}

