import { Dispatch } from "react";
import { loadInboxMessage } from "../inbox/action";
import { RootState } from "../store";
import { InboxNameListInterface } from "./reducer";

export function loadInboxNameList(inboxNameList: InboxNameListInterface[]){
    return {
        type: '@@inboxNameList/LOAD_ALL_NAMES' as '@@inboxNameList/LOAD_ALL_NAMES',
        inboxNameList
    }
}

export function loadInboxNameListThunk() {
    return async (dispatch: Dispatch<any>, getState:() => RootState) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/inboxNameList`, {
            method: 'GET',
        })
        const json = await res.json();

        if (json){
            dispatch(loadInboxNameList(json))
        }
    }
}

export type LoadInboxNameList = ReturnType<typeof loadInboxNameList>
export type InboxNameListActions = LoadInboxNameList