import { Dispatch } from "react";
import { RootState } from "../store";
import { ContactList } from "./reducer";
import urljoin from 'url-join'

export function loadContact(contactList: ContactList){
    return {
        type: '@@contact/LOAD_ALL_CONTACT' as '@@contact/LOAD_ALL_CONTACT',
        contactList
    }
}

export function editContact(contactList: ContactList){
    return {
        type: '@@contact/EDIT_CONTACT' as '@@contact/EDIT_CONTACT',
        contactList
    }
}

export function loadContactThunk(){
    return async (dispatch: Dispatch<any>, getState:() => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/contact'), {
            method: 'GET',
        })
        const json = await res.json();

        if (json){
            dispatch(loadContact(json.contactList))
        }
    }
}

export function editContactThunk(contactList: ContactList){
    return async (dispatch: Dispatch<any>, getState:() => RootState) => {

        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/contact'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactList)
        })

        const json = await res.json()
        if (json.result){
            dispatch(loadContactThunk())
            // dispatch(editContact(json))
        }
    }
}

export type EditContact = ReturnType<typeof editContact>
export type LoadContact = ReturnType<typeof loadContact>
export type ContactActions = EditContact | LoadContact