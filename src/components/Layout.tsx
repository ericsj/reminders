import { Box } from "@mui/material";
import { RemindersAndCalendar } from "./RemindersAndCalendar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReminders,
  selectRemindersStatus,
} from "../features/reminders/remindersSlice";
import { useEffect } from "react";
import { AppDispatch } from "../app/store";

export function Layout() {
  const remindersStatus = useSelector(selectRemindersStatus);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (remindersStatus === "idle") {
      const date = new Date();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const currentDate = `${date.getFullYear()}-${month}`;
      dispatch(fetchReminders(currentDate));
    }
  }, [remindersStatus, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EBF3FE",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "50px",
        width: "100%",
        height: "100%",
      }}
    >
      <RemindersAndCalendar />
    </Box>
  );
}
