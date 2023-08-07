import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import categorySlice from "./redux/categorySlice";
import userSlice from "./redux/userSlice";
import cartSlice from "./redux/cartSlice";
import messageSlice from './redux/messsage';
import slideBarSlice from './redux/sildeBarSlice';

const persistConfig = {
    key: 'category',
    storage
};
const reducers = combineReducers({
    categorySlice: categorySlice,
    cartSlice: cartSlice,
    userSlice: userSlice,
    messageSlice: messageSlice,
    slideBarSlice: slideBarSlice
});

const store = configureStore({
    reducer: reducers,
})

// const customPersistStore = persistStore(store)

export  {store};