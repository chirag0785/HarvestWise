import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    weather:{}
};
export const WeatherSlice=createSlice({
    name:'weather',
    initialState,
    reducers:{
        setWeather:(state,action)=>{
            state.weather=action.payload;
        }
    }
})

export const {setWeather}=WeatherSlice.actions;
export const fetchWeatherData=({pinCode,countryCode})=>async (dispatch)=>{
    try{
        const {data}=await axios.get(`http://localhost:3000/getweather/${pinCode}/${countryCode}`);
        console.log(data);
        dispatch(setWeather(data));
    }
    catch(err){
        console.log(err);
    }
}
export default WeatherSlice.reducer