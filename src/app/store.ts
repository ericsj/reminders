import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "../features/reminders/remindersSlice";
import calendarReducer from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    reminders: remindersReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
