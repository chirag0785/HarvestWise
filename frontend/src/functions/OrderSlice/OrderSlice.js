import { createSlice } from "@reduxjs/toolkit"

const initialState={
    orders:[]
}

const OrderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
       setOrders:(state,action)=>{
            state.orders=action.payload;
       } 
    }
})

export const {setOrders}=OrderSlice.actions

export default OrderSlice.reducer