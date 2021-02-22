import { Dispatch } from "react"
import { RootState } from "../store"
import { CustomBoard } from "./reducer"
import urljoin from 'url-join'

export function getCustomBoard(json: CustomBoard) {
    return {
        type: '@@board/getCustomBoard' as '@@board/getCustomBoard',
        json
    }
}

type BoardActionCreator = typeof getCustomBoard

export type BoardAction = ReturnType<BoardActionCreator>

export function fetchCustomBoard() {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/getCustomBoard'))
        const json = await res.json()
        if (json.result) {
            dispatch(getCustomBoard(json.info[0]))
        }
    }
}

export function CustomizeBoard(body: FormData) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/customizeBoard'), {
            method: 'PUT',
            body: body
        })
        const json = await res.json()
        if (json.result) {
            dispatch(getCustomBoard(json.info))
        }
    }
}