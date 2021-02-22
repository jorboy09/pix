import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { createBrowserHistory } from 'history'
import { CartState, cartReducer } from "./cart/reducer";
import thunk from "redux-thunk";
import { LoginReducer, loginState } from "./Login/LoginReducer";
import { 
    Creator, 
    Fan, 
    Fans, 
    Creators,
    CurUserReducer, 
    CurFanReducer, 
    CurFansReducer,
    CreatorsReducer 
} from "./CurUser/CurUserReducer";
import { Posts, postsReducer } from "./Posts/PostsReducer";
import { ContactAll, contactReducer } from "./contact/reducer";
import { FanList, FanListReducer } from "./fanlist/reducer";
import { CalendarReducer, EventList } from "./calendar/reducer";
import { BoardReductor, CustomBoard } from "./Board/reducer";
import { themeReducer, TArray } from "./Edit/EditReducer";
import { InboxMessage, inboxReducer } from "./inbox/reducer";
import { InboxNameList, inboxNameListReducer } from "./inboxNameList/reducer";

export const history = createBrowserHistory();

export interface RootState {
    router: RouterState
    cart: CartState
    login: loginState
    curUser: Creator
    curFan: Fan
    creators: Creators
    Fans: Fans
    posts: Posts
    fanList: FanList
    eventList: EventList
    contact: ContactAll
    customBoard: CustomBoard
    themes: TArray
    inbox: InboxMessage,
    inboxNameList: InboxNameList
}

const rootReducer = combineReducers<RootState>({
    router: connectRouter(history),
    cart: cartReducer,
    curUser: CurUserReducer,
    curFan: CurFanReducer,
    creators: CreatorsReducer,
    Fans: CurFansReducer,
    posts: postsReducer,
    login: LoginReducer,
    contact: contactReducer,
    fanList: FanListReducer,
    eventList: CalendarReducer,
    customBoard: BoardReductor,
    themes: themeReducer,
    inbox: inboxReducer,
    inboxNameList: inboxNameListReducer
})
declare global {
    /* tslint:disable:interface-name */
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
))