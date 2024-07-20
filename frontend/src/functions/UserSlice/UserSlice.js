import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCart } from "../CartSlice/CartSlice";
import { setOrders } from "../OrderSlice/OrderSlice";
const initialState={
    isLoggedIn:false,
    msg:"",
    user:{},
}
export const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        userSignup:(state,action)=>{
            state.isLoggedIn = action.payload.isLoggedIn;
            state.msg = action.payload.msg;
            state.user = action.payload.user;
        },
        userLogin:(state,action)=>{
            state.isLoggedIn = action.payload.isLoggedIn;
            state.msg = action.payload.msg;
            state.user = action.payload.user;
        },
        setUser:(state,action)=>{
            state.isLoggedIn=true;
            state.user=action.payload;
        },
        userLogout:(state)=>{
            state.isLoggedIn=false;
            state.user={};
            state.msg="";
        },
    }
})
export const {userSignup,userLogin,setUser,userLogout}=UserSlice.actions

export const getUserSignup=({formData})=>async (dispatch)=>{
    try{
        const {data}=await axios.post(`http://localhost:3000/user/signup`,formData)
        return dispatch(userSignup({
            isLoggedIn:false,
            msg:"Sign up success",
            user:{}
        }))
    }catch(err){
        dispatch(userSignup({
            isLoggedIn:false,
            msg:err.response.data.message,
            user:{}
        }))
    }
    
}
export const getUserLogin=({username,password,email})=>async (dispatch)=>{
    try{

        const { data } = await axios.post(`http://localhost:3000/user/login`, {
            username,
            password,
            email
          }, {
            withCredentials: true
          });

          const user={};
        Object.keys(data.user).forEach((key)=>{
            if(key!='cart' && key!='orders'){
                user[key]=data.user[key];
            }
        })
        dispatch(setCart(data.user.cart));
        dispatch(setOrders(data.user.orders));
        return dispatch(userLogin({
            user,
            isLoggedIn:true,
            msg:data.message
        }))
    }catch(err){
        dispatch(userLogin({
            isLoggedIn:false,
            user:{},
            msg:err.response.data.message
        }))
    }
}
export const getUserLogout=({username,password,email})=> async (dispatch)=>{
    try{
        const {data}=await axios.post(`http://localhost:3000/user/logout`,{
            username,
            password,
            email
        },{
            withCredentials:true,
        })
        dispatch(userLogout());
        dispatch(setCart([]));
        dispatch(setOrders([]));
    }catch(err){
        console.log(err.response.data.message);
    }
}

export const updateUserInfo=({username,updates})=> async (dispatch)=>{
    try{
        const {data}=await axios.patch(`http://localhost:3000/user/update/${username}`,updates);
        dispatch(setUser(data.user));
    }catch(err){
        console.log(err.response.data.message);
    }
}

export const getUserOnRefresh=()=> async (dispatch)=>{
    try{
        const {data}=await axios.get(`http://localhost:3000/user/refresh`,{
            withCredentials:true
        })
        const user={};
        Object.keys(data.user).forEach((key)=>{
            if(key!='cart' && key!='orders'){
                user[key]=data.user[key];
            }
        })
        console.log(data.user);
        dispatch(setUser(user));
        dispatch(setCart(data.user.cart));
        dispatch(setOrders(data.user.orders));
    }catch(err){
        console.log(err.response.data.message);
    }
}
export default UserSlice.reducer;