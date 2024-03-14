import dayjs from "dayjs";

export interface IReminderCreate {
  token: string;
  title: string;
  description: string;
  date: string;
  color: string;
}

export type IReminderApiResponse = {
  id: string;
  title: string;
  description: string;
  date: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type IFetchRemindersResponse = {
  reminders: IReminderApiResponse[];
  dates: dayjs.Dayjs[];
};

export type IReminderPatch = {
  title: string;
  description: string;
  date: string;
  color: string;
};

export type IReminderFormatted = {
  id: string;
  title: string;
  description: string;
  date: dayjs.Dayjs;
  color: string;
};

export interface IReminderState {
  reminders: IReminderFormatted[];
  status: string;
  tab: string;
  reminderDates: dayjs.Dayjs[];
  error: string | undefined;
}

export interface IPrepareReminder {
  id: string;
  title: string;
  description: string;
  date: dayjs.Dayjs;
  color: string;
}
