import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productSlice from './features/productSlice';
import userSlice from './features/userSlice';
import appApi from './services/appApi';

//reducers
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath, "products"],
};

// Persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// Creating the store
const store = configureStore({
    reducer: persistedReducer,
});

export default store;