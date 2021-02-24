import { AnyAction } from 'redux';

export interface CartInterface {
	items: { productId: string; quantity: number }[];
}

export const CartActions = {
	ADD_TO_CART: 'ADD_TO_CART',
};

export const initialState: CartInterface = {
	items: [],
};

// cart actions
export const addItemToCart = (productId: string) => {
	return {
		type: CartActions.ADD_TO_CART,
		payload: {
			productId,
		},
	};
};

// cart reducer
export default function cartReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case CartActions.ADD_TO_CART:
			let items = state.items;
			const productIndex = items.findIndex((item) => item.productId === action.payload.productId);
			if (productIndex !== -1) {
				items[productIndex].quantity += 1;
			} else {
				items.push({ productId: action.payload.productId, quantity: 1 });
			}

			return { ...state, items };

		default:
			return state;
	}
}
