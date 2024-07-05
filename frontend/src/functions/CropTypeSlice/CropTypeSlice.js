import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    cropRecom:{
        schedules:[],
        generaladvice:[]
    }
};
export const CropTypeSlice=createSlice({
    name:'croptype',
    initialState,
    reducers:{
        setCropRecommendations:(state,action)=>{
            state.cropRecom.schedules=action.payload.schedules;
            state.cropRecom.generaladvice=action.payload.generalAdvice;
        }
    }
})
export const {setCropRecommendations}=CropTypeSlice.actions
export const fetchCropRecommendations=({soiltype,temp,location})=>async (dispatch)=>{
    try{
        const {data}=await axios.get(`http://localhost:3000/crops/recommendations?soilType=${soiltype}&temp=${temp}&location=${location}`);
        dispatch(setCropRecommendations(data));
    }catch(err){
        console.log(err);
    }
}
export default CropTypeSlice.reducer;