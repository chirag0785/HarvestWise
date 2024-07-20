import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CropReducer from "../functions/CropSlice/CropSlice";
import CropTypeReducer from "../functions/CropTypeSlice/CropTypeSlice";
import WeatherReducer from "../functions/WeatherSlice/WeatherSlice";
import UserReducer from "../functions/UserSlice/UserSlice";
import RoomReducer from '../functions/RoomSlice/RoomSlice';
import CartReducer from "../functions/CartSlice/CartSlice";
import OrderReducer from "../functions/OrderSlice/OrderSlice";

const rootReducer = combineReducers({
    crop: CropReducer,
    croptype: CropTypeReducer,
    weather: WeatherReducer,
    user: UserReducer,
    room: RoomReducer,
    cart:CartReducer,
    order:OrderReducer
});

export const store = configureStore({
    reducer: rootReducer,
});
