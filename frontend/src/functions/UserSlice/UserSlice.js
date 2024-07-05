import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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

export const getUserSignup=({username,email,password})=>async (dispatch)=>{
    try{
        const {data}=await axios.post(`http://localhost:3000/user/signup`,{
            username,
            password,
            email
        })
        if(data.msg=='User already exists'){
            return dispatch(userSignup({
                isLoggedIn:false,
                msg:data.msg,
                user:{}
            }))
        }
        return dispatch(userSignup({
            isLoggedIn:false,
            msg:"Sign up success",
            user:{}
        }))
    }catch(err){
        dispatch(userSignup({
            isLoggedIn:false,
            msg:"internal server error",
            user:{}
        }))
    }
    
}
export const getUserLogin=({username,password,email})=>async (dispatch)=>{
    try{

        const {data}=await axios.post(`http://localhost:3000/user/login`,{
            username,
            password,
            email
        })
        
        if(data.userExists==false){
            return dispatch(userLogin({
                user:{},
                isLoggedIn:false,
                msg:"User not exists"
            }))
        }

        if(data.userExists==true){
            return dispatch(userLogin({
                user:{},
                isLoggedIn:false,
                msg:"Invalid password"
            }))
        }
        return dispatch(userLogin({
            user:data.user,
            isLoggedIn:true,
            msg:"success"
        }))
    }catch(err){
        dispatch(userLogin({
            isLoggedIn:false,
            user:{},
            msg:"Internal Server error"
        }))
    }
}
export const getUserLogout=({username,password,email})=> async (dispatch)=>{
    try{
        const {data}=await axios.post(`http://localhost:3000/user/logout`,{
            username,
            password,
            email
        })
        dispatch(userLogout());
    }catch(err){

    }
}
export default UserSlice.reducer;