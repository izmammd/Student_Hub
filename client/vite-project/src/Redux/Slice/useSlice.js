import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        name : "",
        email:"",
        age:"",
        role:"",
        isLogin : false
    },
    reducers : {
        UpdateUser:(state,action)=>{
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.age = action.payload.age,
            state.role = action.payload.role,
            state.isLogin = action.payload.isLogin
        }
    }
})

export const userReducer = userSlice.reducer;
export const {UpdateUser} = userSlice.actions;