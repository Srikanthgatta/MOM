
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from "../key";
import { toast } from "react-toastify";

export const initialState = {

    loading: false,
    hasErrors: false,
    meeting:[],
    currentmeeting:null,
}

export const meetingSlice = createSlice({
    name:"meeting",
    initialState,
    reducers:{

        getmeeting: state =>{

            state.loading = true
        },

        getmeetingSuccess: (state, {payload}) =>{
            state.loading = false
            state.meeting = payload
            
        },

        getCurrentmeeting: (state, {payload}) =>{
            state.loading = false
            state.currentmeeting = payload
            
        },
        getmeetingFailure: (state, {payload}) =>{

            state.loading = false
            state.meeting = payload
            
        },

    }
})

export const {getmeeting, getmeetingSuccess, getCurrentmeeting, getmeetingFailure } = meetingSlice.actions
      
export const meetingSelector = state => state.meeting
export default meetingSlice.reducer



export const  fetchAllmeeting = () => async dispatch =>{
      dispatch(getmeeting())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/meeting');
        // console.log(data)
        dispatch(getmeetingSuccess(data))

    } catch (error) {

        dispatch(getmeetingFailure())
        toast.error(`${error?.response?.data?.message}`, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

    }
    
}

export const  fetchOnemeeting = (id) => async dispatch =>{

    dispatch(getmeeting())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/meeting/${id}`);
      dispatch(getCurrentmeeting(data))

  } catch ({response}) {

      dispatch(getmeetingFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createmeeting = (values) => async dispatch =>{
    dispatch(getmeeting())
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/meeting', values, config);
      setTimeout(() => {

        toast.success(`${data?.message}`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            theme: "light",
          });
      }, 500) 
        dispatch(fetchAllmeeting())

  } catch ({response}) {
       dispatch(getmeetingFailure())
  }
  
}


export const  deletemeeting = (id) => async dispatch =>{
    const key = "meeting"
    dispatch(getmeeting())
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/meeting/${id}`);
      toast.success(`${data?.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
      });
      dispatch(fetchAllmeeting())

  } catch (error) {

      dispatch(getmeetingFailure())
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

  }
  
}


export const  updatemeeting = (id, values) => async dispatch =>{
    dispatch(getmeeting())
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/meeting/${id}`, values, config);
      toast.success(`${data?.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
      });
      window.location.reload()
      dispatch(fetchAllmeeting())

  } catch (error) {

      dispatch(getmeetingFailure())
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

  }
  
}




