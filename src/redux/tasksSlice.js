import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            let arrayIndex;
            console.log(action.payload);
            for (const [i, task] of state.entries()) {
                if (action.payload.name === task.name) {
                    arrayIndex = i;
                    break;
                }
            }
            state.splice(arrayIndex, 1);
        }
    }
  })
  
  export const { addTask, deleteTask } = tasksSlice.actions
  
  export default tasksSlice.reducer