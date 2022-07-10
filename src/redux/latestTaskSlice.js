import { createSlice } from "@reduxjs/toolkit";

export const latestTaskSlice = createSlice({
    name: 'latestTask',
    initialState: {},
    reducers: {
        setLatestTask: (state, action) => {
            state.task = action.payload;
        }
    }
  })
  
  export const { setLatestTask } = latestTaskSlice.actions
  
  export default latestTaskSlice.reducer