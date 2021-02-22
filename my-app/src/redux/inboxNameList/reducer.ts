import { InboxNameListActions } from "./action";

export interface InboxNameListInterface {
    username: string | null,
    super_fans: boolean | null,
    id: number
}

export interface InboxNameList {
    inboxNameList: InboxNameListInterface[]
}

const initialState: InboxNameList = {
    inboxNameList: []
}


export const inboxNameListReducer = (state: InboxNameList = initialState, action: InboxNameListActions): InboxNameList => {
    if (action.type === '@@inboxNameList/LOAD_ALL_NAMES') {
        return {
            ...state,
            inboxNameList: action.inboxNameList
        }
    }
    
    return { ...state };
}