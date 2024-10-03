import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import userReducer from './user'
import departmentReducer from './department'
import meetingReducer from './meeting'


export default configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        department:departmentReducer,
        meeting:meetingReducer
    }
})