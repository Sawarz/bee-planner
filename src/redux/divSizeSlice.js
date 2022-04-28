import { createSlice } from "@reduxjs/toolkit";

export const divSizeSlice = createSlice({
    name: 'divSize',
    initialState: {},
    reducers: {
        setDivSize: (state, action) => {
            state.size = action.payload;
        }
    }
  })
  
  export const { setDivSize } = divSizeSlice.actions
  
  export default divSizeSlice.reducer