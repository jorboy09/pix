import { ContactActions } from './action'

export interface ContactObject {
    email: string | undefined,
    phone: number | undefined
}

export interface social {
    id?: number, media?: string,  custom_name?: string, name: string
}

export interface SocialObject {
    instagram: social | undefined,
    facebook: social | undefined,
    twitter: social | undefined,
    pinterest: social | undefined,
    linkedin: social | undefined,
    youtube: social| undefined,
    mewe: social| undefined,
    spotify: social| undefined,
    soundcloud: social| undefined,
    snapchat: social| undefined,
    other1: social | undefined,
    other2: social | undefined,
    other3: social | undefined
}

export interface ContactList {
    contact: ContactObject,
    social_media: SocialObject
}

export interface ContactAll {
    contactList: ContactList
}

const initialState: ContactAll = {
    contactList: {
        contact: {
            email: undefined,
            phone: undefined
        },
        social_media: {
            instagram: undefined,
            facebook: undefined,
            twitter: undefined,
            pinterest: undefined,
            linkedin: undefined,
            youtube: undefined,
            mewe: undefined,
            spotify: undefined,
            soundcloud: undefined,
            snapchat: undefined,
            other1: undefined,
            other2: undefined,
            other3: undefined

            
        }
    }
}

export const contactReducer = (state: ContactAll = initialState, action: ContactActions): ContactAll => {
    if (action.type === '@@contact/EDIT_CONTACT') {
        return {
            ...state,
            contactList: action.contactList,
        }
    } else if (action.type === '@@contact/LOAD_ALL_CONTACT') {
        return {
            ...state,
            contactList: action.contactList
        }
    }
    return { ...state };
}