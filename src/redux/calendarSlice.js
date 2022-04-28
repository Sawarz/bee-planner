import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {},
    reducers: {
        setCalendar: (state, action) => {
            state.type = action.payload;
        }
    }
  })
  
  export const { setCalendar } = calendarSlice.actions
  
  export default calendarSlice.reducer