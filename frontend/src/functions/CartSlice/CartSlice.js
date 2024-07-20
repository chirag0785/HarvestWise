import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
const initialState={
    cart:[]
}

export const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload;
        },
        incQuantity:(state,action)=>{
            console.log("matched");
            console.log(action.payload);
            console.log(state.cart);
            let indx=-1;
            state.cart.forEach((item,ind)=>{
                if(item._id===action.payload){
                    indx=ind;
                }
            })

            if(indx!=-1){
                console.log("idhar aaya hun");
                state.cart[indx].quantity++;
            }
            
        },
        decQuantity:(state,action)=>{
            let indx=-1;
            state.cart.forEach((item,ind)=>{
                if(item._id===action.payload){
                    indx=ind;
                }
            })

            if(indx!=-1){
                state.cart[indx].quantity--;
                if(state.cart[indx].quantity==0){
                    state.cart=state.cart.filter((item)=>item._id!=action.payload);
                }
            }
        }
    }
})

export const {setCart,incQuantity,decQuantity}=CartSlice.actions;

export const postAddToCart=({itemId,userId})=>async (dispatch)=>{
    try{
        const {data}=await axios.post('http://localhost:3000/cart/addToCart',{
            itemId,
            userId
        })
        dispatch(setCart(data.cart));

    }catch(err){
        console.log("error adding to cart");
    }
}
export default CartSlice.reducer;
