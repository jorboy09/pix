import { CartActions } from "./action"

export interface DraftCart {
    id?: number;
    name: string;
    image_name: string | null | undefined;
    description: string;
    price: number;
}
export interface CartState {
    shoppings: DraftCart[]
}

const initialState: CartState = {
    shoppings: []
}

export const cartReducer = (state: CartState = initialState, action: CartActions): CartState => {
    if (action.type === '@@cart/ADD_DRAFT_CART') {
        return {
            ...state,
            // shoppings: state.shoppings.concat(action.shopping)
            shoppings: [action.shopping].concat(state.shoppings)

        }
    } else if (action.type === '@@cart/DELETE_DRAFT_CART') {
        return {
            ...state,
            shoppings: state.shoppings.filter(shop => shop.id !== action.shopId)
        }
    } else if (action.type === '@@cart/EDIT_DRAFT_CART') {
        return {
            ...state,
            shoppings: state.shoppings.map(shop => {
                if (shop.id === action.shopId) {
                    return {
                        // ...shop,
                        // ...action.shopId,
                        // ...
                        // id: shop.id,
                        // name: action.shopping.name,
                        // image_name: action.shopping.image_name,
                        // description: action.shopping.description,
                        // price: action.shopping.price
                        ...action.shopping

                    }
                } else {
                    return shop
                }
            })
        }
    } else if (action.type === '@@cart/LOAD_ALL_DRAFT_CART') {
        return {
            ...state,
            shoppings: action.shoppings
        }
    }
    return state;
}