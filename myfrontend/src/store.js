import { configureStore } from '@reduxjs/toolkit';
import productSlice from './feautures/productSlice';
import userSlice from './feautures/userSlice';
import appApi from './services/appApi';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


//reducers
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blackList: [appApi.reducerPath, "products"],
};

// Persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// Creating the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware], // Ensure appApi.middleware is a valid callback function
});

export default store;
