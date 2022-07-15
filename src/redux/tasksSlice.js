import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
            return state;
        },
        deleteTask: (state, action) => {
            let arrayIndex = state.findIndex((task) => {
                return task.id === action.payload.id;
            })
            state.splice(arrayIndex, 1);
            return state;
        },
        updateTask: (state, action) => {
            for (let task of state) {
                if (task.id === action.payload.id) {
                    console.log(action.payload)
                    task.name = action.payload.name;
                    task.startHour = action.payload.startHour;
                    task.startMinute = action.payload.startMinute;
                }
            }
            return state;
        },
        updateTaskLeftPosition: (state, action) => {
            for (let task of state) {
                if (task.id === action.payload.id) {
                    task.left = action.payload.left;
                }
            }
            return state;
        }
    }
  })
  
  export const { addTask, deleteTask, updateTask, updateTaskLeftPosition } = tasksSlice.actions
  
  export default tasksSlice.reducer