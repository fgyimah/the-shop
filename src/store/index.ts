import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import rootReducer from './root';

const middlewares = [thunk];

let store: any;

const persistConfig = {
    key: 'tendoSHOP-root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV === 'development') {
    store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
    store = createStore(persistedReducer, applyMiddleware(...middlewares));
}

export const persistor = persistStore(store);
export default store;
