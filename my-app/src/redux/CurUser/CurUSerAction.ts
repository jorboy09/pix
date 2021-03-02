import { Dispatch } from "react"
import { RootState } from "../store"
import { fetchIsCreator, loginSuccess } from "../Login/LoginAction"
import { Creator, Creators, Fan, Fans } from "./CurUserReducer"
import urljoin from 'url-join'
import { push } from "connected-react-router"

export function getCurUser(json: Creator) {
    return {
        type: '@@/GETCURUSER' as '@@/GETCURUSER',
        json
    }
}
export function getCurFan(json: Fan) {
    return {
        type: '@@/GET_CURUSER_FAN' as '@@/GET_CURUSER_FAN',
        json
    }
}

export function UpdateCategory(category: string) {
    return {
        type: '@@/UpdateCategory' as '@@/UpdateCategory',
        category
    }
}

export function fetchFansType(json: Fans) {
    return {
        type: '@@/FETCH_FANS' as '@@/FETCH_FANS',
        json
    }
}
export function fetchCreatorsType(json: Creator[]) {
    return {
        type: '@@/FETCH_CREATORS' as '@@/FETCH_CREATORS',
        json
    }
}

export type getCurUserAction = ReturnType<
    typeof getCurUser |
    typeof UpdateCategory |
    typeof getCurFan |
    typeof fetchFansType |
    typeof fetchCreatorsType
>

export function fetchUser(token?: string | null) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        //if (getState().login.isAutheticated) {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/currentUser'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + token
            }
        })
        const json = await res.json();
        if (json) {
            // dispatch(loginSuccess(json.token, true))
            dispatch(getCurUser(json))
        }
        //}
    }
}

export function fetchFan(token: string | null) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        if (getState().login.isCreator === false) {
            const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/currentFan'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const json = await res.json();
            if (json) {
                if (getState().login.isCreator === false) {
                    dispatch(loginSuccess(json.token, false))
                }
                dispatch(getCurFan(json))
            }
        }
    }
}

export function fetchFans() {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, `/fetchFans`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();
        if (json) {
            dispatch(fetchFansType(json))
        }
    }
}

export function fetchCreators() {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, `/fetchCreators`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();
        if (json) {
            dispatch(fetchCreatorsType(json.creators))
            if (json.creators.length === 0) {
                dispatch(push('/RegisterPage'))
            } else {
                let path
                const token = localStorage.getItem('token')
                if (token !== null) dispatch(fetchIsCreator(token));
                if (getState().login.isCreator) path = '/creator-main'
                else path = '/main';
                dispatch(push(path));
            }
        }
    }
}

export function updateBoardCategory(category: string, token: string | null) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        if (getState().login.isAutheticated && getState().login.isCreator && token !== null) {
            const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/updateBoardCategory'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ category: category, username: getState().curUser.username })
            })
            const json = await res.json()
            if (json.result) {
                dispatch(UpdateCategory(category))
            }
        }
    }
}

