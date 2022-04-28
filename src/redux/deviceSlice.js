import { createSlice } from "@reduxjs/toolkit";

export const deviceSlice = createSlice({
    name: 'device',
    initialState: {},
    reducers: {
        setDevice: (state, action) => {
            state.type = action.payload;
        }
    }
  })
  
  export const { setDevice } = deviceSlice.actions
  
  export default deviceSlice.reducer