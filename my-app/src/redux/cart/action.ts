import { Dispatch } from "redux";
import { RootState } from "../store"
import urljoin from 'url-join'
// import { loadContact, loadContactThunk } from "../contact/action";
import { DraftCart } from "./reducer";

// action-creator // cannot side effect
export function addDraftCart(shopping: DraftCart) {
    return {
        type: '@@cart/ADD_DRAFT_CART' as '@@cart/ADD_DRAFT_CART',
        shopping
    }
}

// action
export function deleteDraftCart(shopId: number) {
    return {
        type: '@@cart/DELETE_DRAFT_CART' as '@@cart/DELETE_DRAFT_CART',
        shopId
    }
}

export function editDraftCart(shopId: number, shopping: DraftCart) {
    return {
        type: '@@cart/EDIT_DRAFT_CART' as '@@cart/EDIT_DRAFT_CART',
        shopId,
        shopping
    }
}

export function loadAllDraftCart(shoppings: DraftCart[]) {
    return {
        type: '@@cart/LOAD_ALL_DRAFT_CART' as '@@cart/LOAD_ALL_DRAFT_CART',
        shoppings
    }
}

// thunk actions // side-effect
export function fetchCart() {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/onlineStore'), {
            method: 'GET',
        })

        const json = await res.json();
        if (json.result) {
            dispatch(loadAllDraftCart(json.product))
        }
    }
}

// dispatch thunk
export function deleteCartThunk(id: number) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/onlineStore/' + id), {
            method: 'DELETE'
        })

        const json = await res.json();
        if (json.result) {
            // dispatch action

            // Change store state
            dispatch(fetchCart())
        }
    }
}

export function editCartThunk(id: number, name: string, image: File | undefined, description: string, price: number) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {

        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price +"");
        formData.append('image', image!);
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/editOnlineStore/' + id), {
            method: 'PUT',
            body: formData
        })

        const json = await res.json();

        dispatch(editDraftCart(id, json.body[0]))
    }
}

// cartId: number, productname: string, description: string, price: number

export function addDraftCartThunk(name: string, image: File | undefined, description: string, price: number) {
    return async (dispatch: Dispatch<any>) => {

        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price +"");
        formData.append('image', image!);

        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/onlineStore'), {
            method: 'POST',
            body: formData
        })

        const json = await res.json();

        
        dispatch(addDraftCart(json.body[0]))
    }
}

export type AddDraftCart = ReturnType<typeof addDraftCart>
export type DeleteDraftCart = ReturnType<typeof deleteDraftCart>
export type EditDraftCart = ReturnType<typeof editDraftCart>
export type LoadDraftCart = ReturnType<typeof loadAllDraftCart>
export type CartActions = AddDraftCart | DeleteDraftCart | EditDraftCart | LoadDraftCart