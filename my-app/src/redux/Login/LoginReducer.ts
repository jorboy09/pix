import { LoginAction } from './LoginAction';

export interface loginState {
    isAutheticated: boolean,
    username: string | null,
    token: string | null,
    isCreator: boolean
}

const initialLoginState: loginState = {
    isAutheticated: false,
    username: null,
    token: null,
    isCreator: false
}

export const LoginReducer = (state: loginState = initialLoginState, action: LoginAction) => { 
    if (action.type === '@@/LoginAction/LOGIN_SUCCESS') {
        return {
            ...state,
            isAutheticated: true,
            token: action.token,
            isCreator: action.isCreator
        }
    }
    if (action.type === '@@/LoginAction/LOGOUT') {
        return {
            ...state,
            isAutheticated: false,
            username: null,
            token: null,
        }
    }
    if (action.type === '@@/LoginAction/ISCREATOR') {
        return {
            ...state,
            isCreator: action.isCreator
        }
    }
    return {
        ...state
    }
}

