import { useSelector } from "react-redux";
import { selectAllReminders } from "../remindersSlice";
import { ReminderModal } from "../ReminderModal";

export function ReminderList() {
  const remindersStatus = useSelector(selectAllReminders);
  return remindersStatus.map((reminder) => (
    <ReminderModal reminder={reminder} />
  ));
}
