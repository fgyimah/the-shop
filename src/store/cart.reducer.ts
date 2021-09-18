import { AnyAction } from 'redux';
import { Product } from './../@types';

export interface CartInterface {
    items: { product: Product; quantity: number }[];
}

export const CartActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_FROM_CART: 'CLEAR_FROM_CART',
    RESET_CART: 'RESET_CART',
};

export const initialState: CartInterface = {
    items: [],
};

// cart actions
export const addItemToCart = (product: Product) => {
    return {
        type: CartActionTypes.ADD_TO_CART,
        payload: {
            product,
        },
    };
};
export const removeItemFromCart = (product: Product) => {
    return {
        type: CartActionTypes.REMOVE_FROM_CART,
        payload: {
            product,
        },
    };
};

export const clearItemFromCart = (product: Product) => {
    return {
        type: CartActionTypes.CLEAR_FROM_CART,
        payload: {
            product,
        },
    };
};

export const resetCart = () => {
    return {
        type: CartActionTypes.RESET_CART,
    };
};

// cart reducer
export default function cartReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            let items = state.items;
            const productIndex = items.findIndex(
                (item) => item.product.id === action.payload.product.id
            );
            if (productIndex !== -1) {
                items[productIndex].quantity += 1;
            } else {
                items.push({ product: action.payload.product, quantity: 1 });
            }
            return { ...state, items };

        case CartActionTypes.REMOVE_FROM_CART:
            let newItems = state.items;
            const itemIndex = newItems.findIndex(
                (item) => item.product.id === action.payload.product.id
            );
            if (itemIndex === -1) return state;
            if (newItems[itemIndex].quantity === 1) {
                newItems.splice(itemIndex, 1);
            } else {
                newItems[itemIndex].quantity -= 1;
            }
            return { ...state, items: newItems };

        case CartActionTypes.CLEAR_FROM_CART:
            let cartItems = state.items;
            const index = cartItems.findIndex(
                (item) => item.product.id === action.payload.product.id
            );
            if (index === -1) return state;
            cartItems.splice(index, 1);
            return { ...state, items: cartItems };

        case CartActionTypes.RESET_CART:
            return { items: [] };

        default:
            return state;
    }
}
