import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICalendarState } from "./interfaces";
import { RootState } from "../../app/store";

const initialState = {
  currentMonth: new Date().getMonth(),
  selectedDay: 1,
} as ICalendarState;

const calendarSlice = createSlice({
  initialState,
  name: "reminders",
  reducers: {
    move: (state, action: PayloadAction<number>) => {
      if (action.payload === 1) {
        if (state.currentMonth < 11) state.currentMonth++;
      } else {
        if (state.currentMonth > 0) state.currentMonth--;
      }
    },
    selectDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
  },
});

export const selectMonth = (state: RootState) => state.calendar.currentMonth;
export const selectSelectedDay = (state: RootState) =>
  state.calendar.selectedDay;
export const { move, selectDay } = calendarSlice.actions;
export default calendarSlice.reducer;
