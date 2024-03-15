import { useSelector } from "react-redux";
import { selectFilteredReminders } from "../remindersSlice";
import { ReminderModal } from "./ReminderModal";
import { NoReminder } from "./NoReminder";
import { Box } from "@mui/material";
import { Header } from "./Header";

export function ReminderList() {
  const reminders = useSelector(selectFilteredReminders);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        sx={{
          width: "669px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {reminders.length === 0 ? (
          <NoReminder />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
              height: "500px",
              overflowY: "scroll",
            }}
            className="custom-scrollbar"
          >
            {reminders.map((reminder) => (
              <ReminderModal reminder={reminder} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
