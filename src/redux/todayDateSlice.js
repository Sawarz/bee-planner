import { createSlice } from "@reduxjs/toolkit";

export const todayDateSlice = createSlice({
    name: 'todayDate',
    initialState: {},
    reducers: {
        setDate: (state, action) => {
            state.type = action.payload;
        }
    }
  })
  
  export const { setDate } = todayDateSlice.actions
  
  export default todayDateSlice.reducer