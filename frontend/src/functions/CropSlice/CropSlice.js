import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    crops:[],
};
export const CropSlice=createSlice({
    name:'crop',
    initialState,
    reducers:{
        setSuitableCrops: (state, action) => {
            state.crops = action.payload;
        },
    }
})
export const {setSuitableCrops} =CropSlice.actions;
export const fetchData=({soiltype,temp,location})=>async (dispatch)=>{
    try{
        const {data}=await axios.get(`http://localhost:3000/crops?soilType=${soiltype}&temp=${temp}&location=${location}`);
        dispatch(setSuitableCrops(data));
    }catch(err){
        console.log(err);
    }
}
export default CropSlice.reducer