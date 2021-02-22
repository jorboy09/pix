import { Dispatch } from "redux"
import { login, loginFan } from "./LoginAction";
import urljoin from 'url-join'
import { successResponse, failResponse, colossalFailure } from './RegisterReducer'

function userAlreadyExists() {
    return '@@/RegisterService/USER_ALREADY_EXISTS' as '@@/RegisterService/USER_ALREADY_EXISTS'
}

function noUser() {
    return '@@/RegisterService/NO_USER_EXISTS_BY_USERNAME' as '@@/RegisterService/NO_USER_EXISTS_BY_USERNAME'
}

function registerSuccess() {
    return '@@/RegisterService/REGISTER_SUCCESS' as '@@/RegisterService/REGISTER_SUCCESS'
}

function registerFail() {
    return '@@/RegisterService/REGISTER_FAIL' as '@@/RegisterService/REGISTER_FAIL'
}

function somethingVeryWrong() {
    return '@@/RegisterService/SOMETHING_VERY_WRONG' as '@@/RegisterService/SOMETHING_VERY_WRONG'
}

export interface RegisterForm {
    username: string,
    password: string,
    description: string
}

export type RSMessage = ReturnType<typeof userAlreadyExists> |
    ReturnType<typeof noUser> 
export type RSResponse = ReturnType<typeof registerSuccess> |
    ReturnType<typeof registerFail> 
export type UhOh = ReturnType<typeof somethingVeryWrong>; 

function ErrorResponseReceiver(result: failResponse["result"] | colossalFailure['result'],
    reason: failResponse['reason'] | colossalFailure['problem']) {
    return {
        type: result,
        reason: reason,
        payload: null,
        pfp: null,
        cvp: null
    }
}

function SuccessfulRegister(type: successResponse['result'], payload: any, pfp: any, cvp: any) {
    return {
        type: type,
        reason: null,
        payload: payload,
        pfp: pfp,
        cvp: cvp
    }
}

export type RegisterAction = ReturnType<typeof ErrorResponseReceiver> | ReturnType<typeof SuccessfulRegister>

export function fanRegister(username: string, password: string, description: string) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/registerFan'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                description
            })
        })
        const json = await res.json();
        if (json.result === '@@/RegisterService/REGISTER_SUCCESS') {
            dispatch(loginFan(username, password))
        } else {
            dispatch(ErrorResponseReceiver(json.result, json.reason))
        }
    }
}

export function creatorRegister(registerInfo: FormData) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/registerCreator'), {
            method: 'POST',
            body: registerInfo
        })
        const json = await res.json();
        if (json.result.result === '@@/RegisterService/REGISTER_SUCCESS') {
            dispatch(SuccessfulRegister(json.result, json.body, json.pfp, json.cvp))
            dispatch(login(json.body.username, json.body.password))
        } else {
            if (json.reason) {
                dispatch(ErrorResponseReceiver(json.result, json.reason))
            } else {
                dispatch(ErrorResponseReceiver(json.result, json.problem))
            }
        }
    }
}