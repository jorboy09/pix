import { Dispatch } from "react"
import { RootState } from "../store"
import { FanList } from "./reducer"
import urljoin from 'url-join'

export function getFanList(json: FanList) {
    return {
        type: '@@fanList/GetFanList' as '@@fanList/GetFanList',
        json
    }
}

type FanListActionCreator = typeof getFanList

export type FanListAction = ReturnType<FanListActionCreator>

export function fetchFanList(saerchtext: string, date: string) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/fanList'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchtext: saerchtext, date: date})
        })
        const json = await res.json()
        if (json.result) {
            dispatch(getFanList(json))
        }
    }
}

export function setSuperFan(id: number, searchtext: string, date: string) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/superfan'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        const json = await res.json()
        if (json.result) {
            dispatch(fetchFanList(searchtext, date))
        }
    }
}

export function banFan(id: number, searchtext: string, date: string) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/banfan'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        const json = await res.json()
        if (json.result) {
            dispatch(fetchFanList(searchtext, date))
        }
    }
}