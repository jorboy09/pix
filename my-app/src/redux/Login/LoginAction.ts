import { Dispatch } from "redux"
import { push } from 'connected-react-router';
import { fetchFan, fetchUser } from "../CurUser/CurUSerAction";
import urljoin from 'url-join'

export function loginSuccess(token: string, isCreator: boolean) {
    return {
        type: '@@/LoginAction/LOGIN_SUCCESS' as '@@/LoginAction/LOGIN_SUCCESS',
        token,
        isCreator
    }
}

export function loginFail() {
    return {
        type: '@@/LoginAction/LOGIN_FAIL' as '@@/LoginAction/LOGIN_FAIL'
    }
}

export function logOut() {
    return {
        type: '@@/LoginAction/LOGOUT' as '@@/LoginAction/LOGOUT'
    }
}

export function checkIsCreator(isCreator: boolean) {
    return {
        type: '@@/LoginAction/ISCREATOR' as '@@/LoginAction/ISCREATOR',
        isCreator
    }
}

export type LoginAction = ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFail>
    | ReturnType<typeof logOut>
    | ReturnType<typeof checkIsCreator>

export function login(username: string, password: string) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const json = await res.json();

        if (json.token) {
            localStorage.setItem('token', json.token)
            dispatch(loginSuccess(json.token, true));
            dispatch(fetchUser());
            dispatch(push("/creator-main"))
        } else {
            dispatch(loginFail())
        }
    }
}

export function loginFan(username: string, password: string) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/loginFan'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const json = await res.json();

        if (json.token) {
            localStorage.setItem('token', json.token)
            dispatch(loginSuccess(json.token, false))
            dispatch(push("/main"))
            dispatch(fetchUser());
        } else {
            dispatch(loginFail())
        }
    }
}

export function fetchIsCreator(token: string) {
    return async (dispatch: Dispatch<any>) => {
        const result = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, `/fetchIsCreator`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const json = await result.json();
        dispatch(loginSuccess(token, json.isCreator))
        if (json.isCreator !== false) dispatch(fetchFan(token));
        dispatch(checkIsCreator(json.isCreator))
        let path: '/creator-main' | '/main'
        if (json.isCreator) path = '/creator-main'
        else path = '/main';
        dispatch(push(path));
    }
}