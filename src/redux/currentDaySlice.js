import { createSlice } from "@reduxjs/toolkit";

export const currentDaySlice = createSlice({
    name: 'currentDay',
    initialState: {},
    reducers: {
        setCurrentDay: (state, action) => {
            state.day = action.payload;
        }
    }
  })
  
  export const { setCurrentDay } = currentDaySlice.actions
  
  export default currentDaySlice.reducer