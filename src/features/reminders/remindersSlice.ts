import { createSlice, nanoid, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IReminderApiResponse, IReminderCreate, IReminderFormatted, IReminderGet, IReminderPatch, IReminderState } from "./interfaces";
import { RootState } from "../../app/store";
import dayjs, { Dayjs } from "dayjs";

const REMINDERS_URL = process.env.REACT_APP_API
const REMINDERS_TOKEN = process.env.REACT_APP_TOKEN

const initialState = {
    reminders: [],
    status: 'idle',
    error: undefined
} as IReminderState

export const fetchReminders = createAsyncThunk('reminders/fetchReminders', async () => {
    try {
        const response = await axios.get<IReminderApiResponse[]>(`${REMINDERS_URL}/${REMINDERS_TOKEN}`)
        return response.data
    } catch (err) {
        return err.message
    }
})
export const createReminder = createAsyncThunk('reminders/createReminder', async (data: IReminderCreate) => {
    try {
        const response = await axios.post<IReminderApiResponse>(REMINDERS_URL, data)
        return response.data
    } catch (err) {
        return err
    }
})
interface IUpdateReminderArgs {
    id: string;
    data: IReminderPatch;
}
export const updateReminder = createAsyncThunk('reminders/updateReminder', async ({ id, data }: IUpdateReminderArgs) => {
    try {
        await axios.patch<void>(`${REMINDERS_URL}/${REMINDERS_TOKEN}/${id}`, data)
        const formattedReminder: IReminderFormatted = {
            id,
            title: data.title,
            description: data.description,
            date: dayjs(new Date(data.date)),
            color: data.color,
        }
        return formattedReminder
    } catch (err) {
        return err
    }
})

interface IPrepare {
    id: string;
    title: string;
    description: string;
    date: dayjs.Dayjs;
    color: string;
}
const remindersSlice = createSlice({
    initialState,
    name: "reminders",
    reducers: {
        addReminder: {
            reducer: (state, action: PayloadAction<IReminderFormatted>) => {
                state.reminders.push(action.payload);
            },
            prepare: ({ id,
                title,
                description,
                date,
                color }: IPrepare) => {
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchReminders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReminders.fulfilled, (state, action: PayloadAction<IReminderApiResponse[]>) => {
                state.status = 'succeeded'
                const loadedReminders = action.payload.map(reminder => ({
                    id: reminder.id,
                    title: reminder.title,
                    description: reminder.description,
                    date: dayjs(new Date(reminder.date)),
                    color: reminder.color,
                }))
                state.reminders = state.reminders.concat(loadedReminders)
            })
            .addCase(fetchReminders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createReminder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createReminder.fulfilled, (state, action: PayloadAction<IReminderApiResponse>) => {
                state.status = 'succeeded'
                const {
                    id,
                    title,
                    description,
                    date,
                    color,
                } = action.payload
                const reminder: IReminderFormatted = {
                    id,
                    title,
                    description,
                    date: dayjs(new Date(date)),
                    color,
                }
                state.reminders.push(reminder)
            })
            .addCase(createReminder.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateReminder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateReminder.fulfilled, (state, action: PayloadAction<IReminderFormatted>) => {
                state.status = 'succeeded'
                state.reminders.filter(reminder => reminder.id !== action.payload.id)
                state.reminders.push(action.payload)
            })
            .addCase(updateReminder.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export const selectAllReminders = (state: RootState) => state.reminders.reminders;
export const getRemindersStatus = (state: RootState) => state.reminders.status;
export const selectReminderById = (state: RootState, reminderId) => state.reminders.reminders.find(reminder => reminder.id === reminderId);
export const getRemindersError = (state: RootState) => state.reminders.error;
export const { reactionAdded, setReminderStatus } = remindersSlice.actions;
export default remindersSlice.reducer;
