import { getCurUserAction } from './CurUSerAction';
import { themesArray,
     colourInvert } from '../Login/RegisterReducer'

export interface Creator {
    username: string | null,
    description: string | null,
    profile_pic: string | null,
    cover_pic: string | null,
    colour_theme: number
    board_category: string
    colourInvert: boolean
    TA: { colour: string, number: number }[][]
}

const initCreator: Creator = {
    username: null,
    description: null,
    profile_pic: null,
    cover_pic: null,
    colour_theme: 3,
    board_category: 'calendar',
    colourInvert: false,
    TA: themesArray
}

export interface Creators {
    creators: Creator[]
}

const initCreators: Creators = {
    creators: []
}

export interface Fan {
    id: number | null
    username: string | null
    description: string | null
    super_fans: boolean
    blacklisted: boolean
}

const initFan: Fan = {
    id: null,
    username: null,
    description: null,
    super_fans: false,
    blacklisted: false
}

export interface Fans {
    fans: Fan[]
}

const initFans: Fans = {
    fans: []
}

function invertedArray(invert: boolean) {
    let TAClone: { colour: string, number: number }[][] = [];
    if (invert) {
        for (let array of themesArray) {
            let a: { colour: string, number: number }[] = [];
            let i: number = 0;
            for (let colour of array) {
                a.push({ colour: colourInvert(colour.colour), number: i });
                i++;
            }
            TAClone.push(a);
        }
        return TAClone;
    } else {
        return themesArray;
    }
}

export function CurUserReducer(state: Creator = initCreator, action: getCurUserAction) {
    if (action.type === '@@/GETCURUSER') {
        const json = action.json;
        let array = invertedArray(json.colourInvert);
        return {
            ...state,
            username: json.username,
            description: json.description,
            profile_pic: json.profile_pic,
            cover_pic: json.cover_pic,
            colour_theme: json.colour_theme,
            board_category: json.board_category,
            colourInvert: json.colourInvert,
            TA: array
        }
    }
    if (action.type === '@@/UpdateCategory') {
        const category = action.category
        return {
            ...state,
            board_category: category
        }
    }
    return {
        ...state
    }
}

export function CurFanReducer(state: Fan = initFan, action: getCurUserAction) {
    if (action.type === '@@/GET_CURUSER_FAN') {
        const json = action.json;
        return {
            ...state,
            id: json.id,
            username: json.username,
            description: json.description,
            super_fans: json.super_fans,
            blacklisted: json.blacklisted
        }
    }
    // if (action.type === '@@/UpdateCategory') {
    //     const category = action.category
    //     return {
    //         ...state,
    //         board_category: category
    //     }
    // }
    return {
        ...state
    }
}

export function CurFansReducer(state: Fans = initFans, action: getCurUserAction) {
    if (action.type === '@@/FETCH_FANS') {
        const json = action.json;
        return {
            ...state, 
            fans: json.fans
        }
    }
    return {
        ...state
    }
}

export function CreatorsReducer(state: Creators = initCreators, action: getCurUserAction) {
    if (action.type === '@@/FETCH_CREATORS') {
        const json = action.json;
        return {
            ...state, 
            creators: json
        }
    }
    return {
        ...state
    }
}

