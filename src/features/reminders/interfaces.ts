import dayjs from "dayjs";

export interface IReminderCreate {
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

export type IReminderDate = {
  date: string;
};

export type IReminderPatch = {
  title: string;
  description: string;
  date: string;
  color: string;
};
export interface IUpdateReminderArgs {
  id: string;
  data: IReminderPatch;
}
export interface IRefreshReminderArgs {
  month: number;
  day: number;
}
export type IReminderFormatted = {
  id: string;
  title: string;
  description: string;
  date: dayjs.Dayjs;
  color: string;
};

export interface IReminderState {
  reminders: IReminderFormatted[];
  filteredReminders: IReminderFormatted[];
  reminderToEdit: IReminderFormatted | undefined;
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
