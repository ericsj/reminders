import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICalendarState } from "./interfaces";
import { RootState } from "../../app/store";
import dayjs from "dayjs";

const initialState = {
  currentMonth: dayjs().month() + 1,
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
    setDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
  },
});

export const selectMonth = (state: RootState) => state.calendar.currentMonth;
export const selectDay = (state: RootState) => state.calendar.selectedDay;
export const { move, setDay } = calendarSlice.actions;
export default calendarSlice.reducer;
