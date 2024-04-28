import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        singInStart:(state)=>{
            state.loading=true;
        },
        singInSuccess:(state,action)=>{
            state.currentUser =action.payload;
            state.loading=false;
            state.error=null;
        },
        singInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null
        },
        updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser =null;
            state.loading=false;
            state.error=null
        },
        singoutUserStart:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },singoutUserSuccess:(state,action)=>{
            state.currentUser =null;
            state.loading=false;
            state.error=null
        },
        singoutUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
}})

export const {
    singInStart,
    singInFailure,
    singInSuccess,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    singoutUserStart,
    singoutUserSuccess,
    singoutUserFailure
} =userSlice.actions;

export default userSlice.reducer;