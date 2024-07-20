import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    room:[],
    msg:""
}
const MAX_MESSAGES=15;
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
                    const newMessages=[...r.messages, {
                        text: action.payload.msg.text,
                        sender: {
                            username:action.payload.msg.sender.username,
                            image:action.payload.msg.sender.image
                        },
                        img: action.payload.msg.img
                    }]

                    if(newMessages.length>MAX_MESSAGES){
                        newMessages.splice(0,1);
                    }
                    return {
                        ...r,
                        messages: newMessages
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
export const addnewMsg = ({ room, msg, username, formData,image }) => async (dispatch) => {
    try {
        let { data } = await axios.post(`http://localhost:3000/room/addMsg`, formData)

        console.log(data);
        await dispatch(newMsg({
            msg: {
                text: data.message.text,
                sender: {
                            username:data.message.sender.username,
                            image:data.message.sender.image
                        },
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
