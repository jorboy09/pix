import { Dispatch } from "react";
import { RootState } from "../store";
import { InboxInterface, InboxMessage } from "./reducer";

export function loadInboxMessage(inboxAll: InboxInterface[]){
    return {
        type: '@@inbox/LOAD_ALL_MESSAGES' as '@@inbox/LOAD_ALL_MESSAGES',
        inboxAll
    }
}

export function addInboxMessage(message: InboxInterface){
    return {
        type: '@@inbox/ADD_MESSAGE' as '@@inbox/ADD_MESSAGE',
        message
    }
}

export function loadMessagesThunk(id:number){
    return async (dispatch: Dispatch<any>, getState:() => RootState) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/inbox/` + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if (json){
            dispatch(loadInboxMessage(json))
        }
    }
}

export function addMessagesThunk(inboxAll: InboxMessage){
    return async (dispatch: Dispatch<any>, getState:() => RootState) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/inbox`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inboxAll)
        })
        const json = await res.json();
        // if (json){
        //     dispatch(addInboxMessage(json.message[0]))
        // }
    }
}


export type LoadInboxMessage = ReturnType<typeof loadInboxMessage>
export type AddInboxMessage = ReturnType<typeof addInboxMessage>
export type InboxActions = LoadInboxMessage | AddInboxMessage