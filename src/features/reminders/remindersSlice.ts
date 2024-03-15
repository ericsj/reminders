import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IFetchRemindersResponse,
  IRefreshReminderArgs,
  IReminderApiResponse,
  IReminderDate,
  IReminderForm,
  IReminderFormatted,
  IReminderState,
} from "./interfaces";
import { RootState } from "../../app/store";

const REMINDERS_URL = process.env.REACT_APP_API as string;
const REMINDERS_TOKEN = process.env.REACT_APP_TOKEN as string;

dayjs.extend(utc);
dayjs.extend(timezone);

const initialState = {
  reminders: [],
  status: "idle",
  reminderToEdit: undefined,
  tab: "list",
  filteredReminders: [],
  reminderDates: [],
  error: undefined,
} as IReminderState;

export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async (baseDate: string) => {
    try {
      const datesUrl = `${REMINDERS_URL}/${REMINDERS_TOKEN}?date=${baseDate}`;
      const datesStr = (await axios.get<IReminderDate[]>(datesUrl)).data;
      const dates = datesStr.map((isoDate) => dayjs(isoDate.date));
      const reminders = await Promise.all(
        dates.map(async (date) => {
          const url = `${REMINDERS_URL}/${REMINDERS_TOKEN}/by-day?date=${date.add(1, "day").format("YYYY-MM-DD")}`;
          const response = await axios.get<IReminderApiResponse[]>(url);
          return response.data;
        })
      );
      return { dates, reminders: reminders.flat() };
    } catch (err) {
      return err.message;
    }
  }
);
export const createReminder = createAsyncThunk(
  "reminders/createReminder",
  async (data: IReminderForm) => {
    const apiData = {
      title: data.title,
      description: data.description,
      date: dayjs(`${data.date}-${data.time}`, "MM/DD/YYYY-HH:mm"),
      color: data.color,
      token: REMINDERS_TOKEN,
    };
    try {
      const response = await axios.post<IReminderApiResponse>(
        `${REMINDERS_URL}`,
        apiData
      );
      enqueueSnackbar("Reminder created successfully", { variant: "success" });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
  async (data: IReminderForm) => {
    const apiData = {
      title: data.title,
      description: data.description,
      date: dayjs(`${data.date}-${data.time}`, "MM/DD/YYYY-HH:mm"),
      color: data.color,
    };
    try {
      await axios.patch<IReminderApiResponse>(
        `${REMINDERS_URL}/${REMINDERS_TOKEN}/${data.id}`,
        apiData
      );
      enqueueSnackbar("Reminder updated successfully", { variant: "success" });
      return { ...apiData, id: data.id };
    } catch (err) {
      return err;
    }
  }
);
export const removeReminder = createAsyncThunk(
  "reminders/removeReminder",
  async (id: string) => {
    try {
      await axios.delete<IReminderApiResponse>(
        `${REMINDERS_URL}/${REMINDERS_TOKEN}/${id}`
      );
      enqueueSnackbar("Reminder removed successfully", { variant: "success" });
      return id;
    } catch (err) {
      return err;
    }
  }
);

const remindersSlice = createSlice({
  initialState,
  name: "reminders",
  reducers: {
    setReminderStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
    refreshReminder(state, action: PayloadAction<IRefreshReminderArgs>) {
      state.filteredReminders = state.reminders.filter(
        (reminder) =>
          reminder.date.date() === action.payload.day &&
          reminder.date.month() + 1 === action.payload.month
      );
    },
    setFilteredReminders(state, action: PayloadAction<IReminderFormatted[]>) {
      state.filteredReminders = action.payload;
    },
    setReminderToEdit: (state, action: PayloadAction<IReminderFormatted>) => {
      state.reminderToEdit = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReminders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReminders.fulfilled,
        (state, action: PayloadAction<IFetchRemindersResponse>) => {
          state.status = "succeeded";
          const loadedReminders = action.payload.reminders.map((reminder) => ({
            id: reminder.id,
            title: reminder.title,
            description: reminder.description,
            date: dayjs(reminder.date),
            color: reminder.color,
          }));
          state.reminderDates = action.payload.dates;
          state.reminders = loadedReminders;
        }
      )
      .addCase(fetchReminders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createReminder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createReminder.fulfilled,
        (state, action: PayloadAction<IReminderApiResponse>) => {
          state.status = "succeeded";
          const { id, title, description, date, color } = action.payload;
          const reminder: IReminderFormatted = {
            id,
            title,
            description,
            date: dayjs(new Date(date)),
            color,
          };
          state.reminders.push(reminder);
        }
      )
      .addCase(createReminder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateReminder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateReminder.fulfilled,
        (state, action: PayloadAction<IReminderFormatted>) => {
          state.status = "succeeded";
          state.reminders = state.reminders.filter(
            (reminder) => reminder.id !== action.payload.id
          );
          state.reminders.push(action.payload);
        }
      )
      .addCase(updateReminder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeReminder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        removeReminder.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.reminders = state.reminders.filter(
            (reminder) => reminder.id !== action.payload
          );
        }
      )
      .addCase(removeReminder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllReminders = (state: RootState) =>
  state.reminders.reminders;
export const selectTab = (state: RootState) => state.reminders.tab;
export const selectRemindersStatus = (state: RootState) =>
  state.reminders.status;
export const selectReminderToEdit = (state: RootState) =>
  state.reminders.reminderToEdit;
export const selectReminderDates = (state: RootState) =>
  state.reminders.reminderDates;
export const selectFilteredReminders = (state: RootState) =>
  state.reminders.filteredReminders;
export const selectReminderById = (state: RootState, reminderId) =>
  state.reminders.reminders.find((reminder) => reminder.id === reminderId);
export const getRemindersError = (state: RootState) => state.reminders.error;
export const {
  setReminderStatus,
  setTab,
  refreshReminder,
  setReminderToEdit,
  setFilteredReminders,
} = remindersSlice.actions;
export default remindersSlice.reducer;
