import { FanListAction } from './action'

export interface FanList {
    list: {
        id: number | null,
        name: string,
        super_fans: boolean,
        activity: {
            created_at: string,
            message: string
        }[]
    }[]
}

const initFanList: FanList= {
    list: [{
        id: null,
        name: '',
        super_fans: false,
        activity: [{
            created_at: '',
            message: ''
        }]
    }]
}

export function FanListReducer (state: FanList = initFanList, action: FanListAction){
    if (action.type === '@@fanList/GetFanList'){
        const json = action.json
        return {
            ...state,
            list: json.list
        }
    }
    return {
        ...state
    }
}