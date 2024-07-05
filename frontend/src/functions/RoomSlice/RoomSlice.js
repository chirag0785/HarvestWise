import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    room:[],
    msg:""
}
export const RoomSlice=createSlice({
    name:'room',
    initialState,
    reducers:{
        setRooms:(state,action)=>{
            state.room=action.payload.room;
            state.msg=action.payload.msg;
        },
        addRoom:(state,action)=>{
            if(action.payload.room!={}){
                state.room.push({...action.payload.room,messages:[]});
            }
            state.msg=action.payload.msg;
        },
        newMsg: (state, action) => {
            state.room = state.room.map(r => {
                if (r._id === action.payload.roomId) {
                    return {
                        ...r,
                        messages: [...r.messages, {
                            text: action.payload.msg.text,
                            sender: action.payload.msg.sender,
                            img: action.payload.msg.img
                        }]
                    };
                }
                return r;
            });
        }
    }
})

export const {setRooms,addRoom,newMsg}=RoomSlice.actions
export const getRooms=()=>async (dispatch)=>{
    try{
        const {data}=await axios.get(`http://localhost:3000/room/getrooms`);
        dispatch(setRooms({room:data.rooms,msg:""}));
    }catch(err){
        dispatch(setRooms({room:[],msg:"Internal server error"}));
    }
}
export const addToRooms=({name,description})=>async (dispatch)=>{
    try{
        const {data}=await axios.post(`http://localhost:3000/room/addroom`,{
            name,
            description
        })
        dispatch(addRoom({room:data.room,msg:""}));
    }catch(err){
        dispatch(addRoom({room:{},msg:"Internal server error"}))
    }
}
export const addnewMsg = ({ room, msg, username, formData }) => async (dispatch) => {
    try {
        let { data } = await axios.post(`http://localhost:3000/room/addMsg`, formData)

        console.log(data);
        await dispatch(newMsg({
            msg: {
                text: data.message.text,
                sender: {username},
                img: data.message.img
            },
            roomId: room._id
        }));

        return data;
    } catch (err) {
        console.error("Error adding new message:", err);
    }
}
export default RoomSlice.reducer
