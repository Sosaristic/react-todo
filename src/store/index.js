import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import taskSlice from "./taskSlice";


// combine the slices you want to persist
const reducers = combineReducers({
    tasks: taskSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage, //by default it persist it to local storage
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
    reducer: persistedReducer,
})


export default store;