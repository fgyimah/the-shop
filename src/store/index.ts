import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root';

const middlewares = [thunk];

let store: any;

if (process.env.NODE_ENV === 'development') {
	store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
	store = createStore(rootReducer, applyMiddleware(...middlewares));
}

export default store;
