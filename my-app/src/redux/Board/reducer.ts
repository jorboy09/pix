import { BoardAction } from './action'

export interface CustomBoard {
    title: string,
    media: string | null,
    description: string | null
}

const initCustom: CustomBoard = {
    title: 'Recommendation',
    media: null,
    description: null
}

export function BoardReductor(state: CustomBoard = initCustom, action: BoardAction) {
    if (action.type === '@@board/getCustomBoard') {
        const json = action.json
        if (json){
            return {
                ...state,
                title: json.title,
                media: json.media,
                description: json.description
            }
        }else {
            return {
                ...state
            }
        }
    }
    return {
        ...state
    }
}