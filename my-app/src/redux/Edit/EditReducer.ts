import { themesArray, colourInvert } from '../Login/RegisterReducer'
import { EditAction } from './EditAction';

export interface TArray {
    TA: { colour: string, number: number }[][]
}

const initThemesArray: TArray = {
    TA: themesArray
}

function invertedArray() {
    const TAClone: { colour: string, number: number }[][] = [];
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
}

export const themeReducer = (state: TArray = initThemesArray, action: EditAction) => {
    if (action.type === '@@/Edit/INVERT_COLOUR') {
        if (action.isInvert) {
            return {
                ...state,
                TA: invertedArray()
            }
        } else {
            return {
                ...state,
                TA: themesArray
            }
        }
    }
    return {
        ...state
    }
}