import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IFetchRemindersResponse,
  IPrepareReminder,
  IReminderApiResponse,
  IReminderCreate,
  IReminderFormatted,
  IReminderPatch,
  IReminderState,
} from "./interfaces";
import { RootState } from "../../app/store";
import dayjs from "dayjs";

const REMINDERS_URL = process.env.REACT_APP_API as string;
const REMINDERS_TOKEN = process.env.REACT_APP_TOKEN as string;

const initialState = {
  reminders: [],
  status: "idle",
  tab: "list",
  reminderDates: [],
  error: undefined,
} as IReminderState;

export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async (date: string) => {
    try {
      const datesUrl = `${REMINDERS_URL}/${REMINDERS_TOKEN}?date=${date}`;
      const datesStr = (await axios.get<string[]>(datesUrl)).data;
      const dates = datesStr.map((isoDate) => dayjs(isoDate));
      const reminders = await Promise.all(
        dates.map(async (date) => {
          const url = `${REMINDERS_URL}/${REMINDERS_TOKEN}/by-day?date=${date.format("YYYY-MM-DD")}`;
          const response = await axios.get<IReminderApiResponse[]>(url);
          return response.data;
        })
      );
      return { dates, reminders };
    } catch (err) {
      return err.message;
    }
  }
);
export const createReminder = createAsyncThunk(
  "reminders/createReminder",
  async (data: IReminderCreate) => {
    try {
      const response = await axios.post<IReminderApiResponse>(
        REMINDERS_URL,
        data
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
interface IUpdateReminderArgs {
  id: string;
  data: IReminderPatch;
}
export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
  async ({ id, data }: IUpdateReminderArgs) => {
    try {
      await axios.patch<void>(
        `${REMINDERS_URL}/${REMINDERS_TOKEN}/${id}`,
        data
      );
      const formattedReminder: IReminderFormatted = {
        id,
        title: data.title,
        description: data.description,
        date: dayjs(new Date(data.date)),
        color: data.color,
      };
      return formattedReminder;
    } catch (err) {
      return err;
    }
  }
);

const remindersSlice = createSlice({
  initialState,
  name: "reminders",
  reducers: {
    addReminder: {
      reducer: (state, action: PayloadAction<IReminderFormatted>) => {
        state.reminders.push(action.payload);
      },
      prepare: (props: IPrepareReminder) => {
        const { id, title, description, date, color } = props;
        return {
          payload: {
            id,
            title,
            description,
            date: dayjs(date).toISOString(),
            color,
          },
        };
      },
    },
    setReminderStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
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
            date: dayjs(new Date(reminder.date)),
            color: reminder.color,
          }));
          state.reminderDates = action.payload.dates;
          state.reminders = state.reminders.concat(loadedReminders);
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
          state.reminders.filter(
            (reminder) => reminder.id !== action.payload.id
          );
          state.reminders.push(action.payload);
        }
      )
      .addCase(updateReminder.rejected, (state, action) => {
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
export const selectReminderDates = (state: RootState) =>
  state.reminders.reminderDates;
export const selectReminderById = (state: RootState, reminderId) =>
  state.reminders.reminders.find((reminder) => reminder.id === reminderId);
export const getRemindersError = (state: RootState) => state.reminders.error;
export const { setReminderStatus, setTab, addReminder } =
  remindersSlice.actions;
export default remindersSlice.reducer;
