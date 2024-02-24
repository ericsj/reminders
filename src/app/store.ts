import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "../features/reminders/remindersSlice";

export const store = configureStore({
    reducer: {
        reminders: remindersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch