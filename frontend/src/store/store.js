import { configureStore,combineReducers } from "@reduxjs/toolkit";
import CropReducer from "../functions/CropSlice/CropSlice";
import CropTypeReducer from "../functions/CropTypeSlice/CropTypeSlice";
import WeatherReducer from "../functions/WeatherSlice/WeatherSlice";
import UserReducer from "../functions/UserSlice/UserSlice";
import RoomReducer from '../functions/RoomSlice/RoomSlice'
import storage from "redux-persist/lib/storage";
import { persistReducer,persistStore } from "redux-persist";
const persistConfig={
    key:"root",
    version:1,
    storage
}
const rootReducer=combineReducers({
    crop:CropReducer,
    croptype:CropTypeReducer,
    weather:WeatherReducer,
    user:UserReducer,
    room:RoomReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:["persist/PERSIST"]
        }
    })
})
export const persistor=persistStore(store);