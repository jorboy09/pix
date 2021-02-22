import { Dispatch } from 'react';
import { fetchUser } from '../CurUser/CurUSerAction';
import urljoin from 'url-join'
import { push } from 'connected-react-router';
type inputTypes = 'password' | 'description' | 'pfp' | 'cvp' | 'colour_theme' | 'invert'

function updateSuccess(message: inputTypes) {
    if (message === 'password') {
        return '@@/UpdateService/UPDATE_PASSWORD_SUCCESS' as '@@/UpdateService/UPDATE_PASSWORD_SUCCESS'
    }
    if (message === 'description') {
        return '@@/UpdateService/UPDATE_DESCRIPTION_SUCCESS' as '@@/UpdateService/UPDATE_DESCRIPTION_SUCCESS'
    }
    if (message === 'pfp') {
        return '@@/UpdateService/UPDATE_PFP_SUCCESS' as '@@/UpdateService/UPDATE_PFP_SUCCESS'
    }
    if (message === 'cvp') {
        return '@@/UpdateService/UPDATE_CVP_SUCCESS' as '@@/UpdateService/UPDATE_CVP_SUCCESS'
    }
    if (message === 'colour_theme') {
        return '@@/UpdateService/UPDATE_COLOUR_THEME_SUCCESS' as '@@/UpdateService/UPDATE_COLOUR_THEME_SUCCESS'
    }
    if (message === 'invert') {
        return '@@/UpdateService/INVERT_COLOUR_THEME_SUCCESS' as '@@/UpdateService/INVERT_COLOUR_THEME_SUCCESS'
    }
}

function updateFail(message: inputTypes) {
    if (message === 'password') {
        return '@@/UpdateService/UPDATE_PASSWORD_FAIL' as '@@/UpdateService/UPDATE_PASSWORD_FAIL'
    }
    if (message === 'description') {
        return '@@/UpdateService/UPDATE_DESCRIPTION_FAIL' as '@@/UpdateService/UPDATE_DESCRIPTION_FAIL'
    }
    if (message === 'pfp') {
        return '@@/UpdateService/UPDATE_PFP_FAIL' as '@@/UpdateService/UPDATE_PFP_FAIL'
    }
    if (message === 'cvp') {
        return '@@/UpdateService/UPDATE_CVP_FAIL' as '@@/UpdateService/UPDATE_CVP_FAIL'
    }
    if (message === 'colour_theme') {
        return '@@/UpdateService/UPDATE_COLOUR_THEME_FAIL' as '@@/UpdateService/UPDATE_COLOUR_THEME_FAIL'
    }
    if (message === 'invert') {
        return '@@/UpdateService/INVERT_COLOUR_THEME_FAIL' as '@@/UpdateService/INVERT_COLOUR_THEME_FAIL'
    }
}

export type updateMessage = ReturnType<typeof updateSuccess | typeof updateFail>

function editSuccess() {
    return {
        type: '@@/Edit/EDIT_SUCCESS' as '@@/Edit/EDIT_SUCCESS'
    }
}

function editFail() {
    return {
        type: '@@/Edit/EDIT_FAIL' as '@@/Edit/EDIT_FAIL'
    }
}

function invertColour (isInvert: boolean) {
    return {
        type: '@@/Edit/INVERT_COLOUR' as '@@/Edit/INVERT_COLOUR',
        isInvert
    }
}

export type EditAction = ReturnType<typeof editSuccess | typeof editFail | typeof invertColour>;

export function editPassword(username: string, password: string, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/editPassword'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ username: username, password: password })
        })
        const json: { result: updateMessage } = await res.json();
        if (json.result === '@@/UpdateService/UPDATE_PASSWORD_SUCCESS') {
            const token = localStorage.getItem('token')
            dispatch(fetchUser(token))
            dispatch(editSuccess())
            dispatch(push("/creator-main"))
        } else if (json.result === '@@/UpdateService/UPDATE_PASSWORD_FAIL') {
            dispatch(editFail())
        }
    }
}

export function editDescription(username: string, description: string, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/editDescription'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ username: username, description: description })
        })
        const json: { result: updateMessage } = await res.json();
        if (json.result === '@@/UpdateService/UPDATE_DESCRIPTION_SUCCESS') {
            const token = localStorage.getItem('token')
            dispatch(fetchUser(token))
            dispatch(editSuccess())
            dispatch(push("/creator-main"))
        } else if (json.result === '@@/UpdateService/UPDATE_DESCRIPTION_FAIL') {
            dispatch(editFail())
        }
    }
}

export function editProfilePic(profilePic: FormData, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/editPFP'), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: profilePic
        })
        const json: { result: updateMessage } = await res.json();
        if (json.result === '@@/UpdateService/UPDATE_PFP_SUCCESS') {
            const token = localStorage.getItem('token')
            dispatch(fetchUser(token))
            dispatch(editSuccess())
            dispatch(push("/creator-main"))
        } else if (json.result === '@@/UpdateService/UPDATE_PFP_FAIL') {
            dispatch(editFail())
        }
    }
}

export function editCoverPic(coverPic: FormData, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/editCVP'), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: coverPic
        })
        const json: { result: updateMessage } = await res.json();
        if (json.result === '@@/UpdateService/UPDATE_CVP_SUCCESS') {
            const token = localStorage.getItem('token')
            dispatch(fetchUser(token))
            dispatch(editSuccess())
            dispatch(push("/creator-main"))
        } else if (json.result === '@@/UpdateService/UPDATE_CVP_FAIL') {
            dispatch(editFail())
        }
    }
}

export function editColourTheme(username: string, colourTheme: string, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/editColourTheme'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ username: username, colour_theme: colourTheme })
        })
        const json: { result: updateMessage } = await res.json();
        if (json.result === '@@/UpdateService/UPDATE_COLOUR_THEME_SUCCESS') {
            const token = localStorage.getItem('token')
            dispatch(fetchUser(token))
            dispatch(editSuccess())
            dispatch(push("/creator-main"))
        } else if (json.result === '@@/UpdateService/UPDATE_COLOUR_THEME_FAIL') {
            dispatch(editFail())
        }
    }
}

export function invertTheme(username: string, invert: boolean, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/invertTheme'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ username: username, invert: invert })
        })
        const json: { result: updateMessage } = await res.json();
        if (json.result === '@@/UpdateService/INVERT_COLOUR_THEME_SUCCESS') {
            const token = localStorage.getItem('token')
            dispatch(fetchUser(token))
            dispatch(invertColour(invert))
            dispatch(push("/creator-main"))
        } else if (json.result === '@@/UpdateService/INVERT_COLOUR_THEME_FAIL') {
            dispatch(editFail())
        }
    }
}

