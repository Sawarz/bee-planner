import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            let arrayIndex = state.findIndex((task) => {
                return task.name = action.payload.name;
            })
            state.splice(arrayIndex, 1);
        }
    }
  })
  
  export const { addTask, deleteTask } = tasksSlice.actions
  
  export default tasksSlice.reducer