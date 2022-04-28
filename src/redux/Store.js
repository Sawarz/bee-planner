import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./deviceSlice";
import calendarSlice from "./calendarSlice";
import divSizeSlice from "./divSizeSlice";
import tasksSlice from "./tasksSlice";
import { loadState } from "./localStorage";

const savedState = loadState();

export default configureStore({
    reducer: {
        device: deviceSlice,
        calendar: calendarSlice,
        divSize: divSizeSlice,
        tasks: tasksSlice
    },
    preloadedState: {
        device: null,
        calendar: savedState.calendar
    }
})