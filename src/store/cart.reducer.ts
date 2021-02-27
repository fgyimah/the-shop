import { AnyAction } from 'redux';
import { Product } from './../@types';

export interface CartInterface {
	items: { product: Product; quantity: number }[];
}

export const CartActionTypes = {
	ADD_TO_CART: 'ADD_TO_CART',
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

// cart reducer
export default function cartReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case CartActionTypes.ADD_TO_CART:
			let items = state.items;
			const productIndex = items.findIndex((item) => item.product.id === action.payload.product.id);
			if (productIndex !== -1) {
				items[productIndex].quantity += 1;
			} else {
				items.push({ product: action.payload.product, quantity: 1 });
			}

			return { ...state, items };

		default:
			return state;
	}
}
