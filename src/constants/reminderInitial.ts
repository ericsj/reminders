import dayjs from "dayjs";
import { IReminderFormatted } from "../features/reminders/interfaces";

export const reminderInitial: IReminderFormatted = {
  color: "",
  date: dayjs(),
  description: "",
  id: "",
  title: "",
};
