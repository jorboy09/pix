import { InboxActions } from "./action";

export interface InboxInterface {
    username: string | null,
    super_fans: boolean | null,
    creator: boolean | null,
    message: string | null,
    id: number,
    created_at: string,
    updated_at: string
}

export interface InboxMessage {
    inboxAll: InboxInterface[]
}

const initialState: InboxMessage = {
    inboxAll: []
   
}

export const inboxReducer = (state: InboxMessage = initialState, action: InboxActions): InboxMessage => {
    if (action.type === '@@inbox/LOAD_ALL_MESSAGES') {
        return {
            ...state,
            inboxAll: action.inboxAll
            // inboxAll: state.inboxAll.map(inbox => {
            //     if (inbox.id = action.inboxId) {
            //         return {
            //             inbox
            //         }
            //     }
            // })
        }
    } else  if (action.type === '@@inbox/ADD_MESSAGE'){
        return {
            ...state,
            // inboxAll: [action.message].concat(state.inboxAll)
            inboxAll: state.inboxAll.concat(action.message)
        }
    }
    
    return { ...state };
}