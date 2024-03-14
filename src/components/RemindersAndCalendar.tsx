import { Box } from "@mui/material";
import { CalendarContainer } from "../features/calendar/components/CalendarContainer";
import { ReminderList } from "../features/reminders/components/ReminderList";
import { AddReminder } from "../features/reminders/components/AddReminder";
import { useSelector } from "react-redux";
import { selectTab } from "../features/reminders/remindersSlice";

export function RemindersAndCalendar() {
  const tab = useSelector(selectTab);
  let content: JSX.Element = <ReminderList />;
  if (tab === "add") {
    content = <AddReminder />;
  } else if (tab === "edit") {
    // content = <ReminderModal setAdding={setAdding} />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "1119px",
        height: "686px",
        borderRadius: "40px",
        backgroundColor: "white",
      }}
    >
      {content}
      <CalendarContainer />
    </Box>
  );
}
