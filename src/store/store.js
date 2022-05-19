import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/index"
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {};
const middleware = [thunk];

const persistConfig = {
    key: 'site',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
);


export const persistor = persistStore(store)
export default store