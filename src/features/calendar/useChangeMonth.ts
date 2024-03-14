import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { move, selectDay, selectMonth } from "./calendarSlice";
import {
  fetchReminders,
  refreshReminder,
  selectRemindersStatus,
  setFilteredReminders,
  setReminderStatus,
} from "../reminders/remindersSlice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";

export const useChangeMonth = () => {
  const dispatch: AppDispatch = useDispatch();
  const current = useSelector(selectMonth);
  const status = useSelector(selectRemindersStatus);
  const month = useSelector(selectMonth);
  const day = useSelector(selectDay);
  useEffect(() => {
    dispatch(refreshReminder({ month, day }));
  }, [status, month, day, dispatch]);

  return (direction: number) => {
    const newMonth = current + direction;
    if (newMonth > 0 && newMonth < 11) {
      dispatch(setReminderStatus("loading"));
      const newMonthQuery = `${dayjs().format("YYYY")}-${`0${newMonth}`.slice(-2)}`;
      dispatch(setFilteredReminders([]));
      dispatch(fetchReminders(newMonthQuery));
      if (direction === 1) {
        dispatch(move(1));
      } else {
        dispatch(move(-1));
      }
    }
  };
};
