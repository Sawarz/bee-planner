import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./deviceSlice";
import todayDateSlice from "./todayDateSlice";
import divSizeSlice from "./divSizeSlice";
import tasksSlice from "./tasksSlice";
import usernameSlice from "./usernameSlice";
import currentDaySlice from "./currentDaySlice";

let todayDay = new Date().getDate();
let todayMonth = new Date().getMonth() + 1;
let todayYear = new Date().getFullYear();

let todayDate = todayDay + "." + todayMonth + "." + todayYear;

const store = configureStore({
    reducer: {
        device: deviceSlice,
        todayDate: todayDateSlice,
        divSize: divSizeSlice,
        tasks: tasksSlice,
        username: usernameSlice,
        currentDay: currentDaySlice
    },
    preloadedState: {
        device: null,
        todayDate: todayDate
    }
})

export default store;
