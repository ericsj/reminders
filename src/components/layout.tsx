import { Box, CircularProgress } from "@mui/material";
import { ReactComponent as CodelittLogo } from "../assets/codelitt-logo.svg";
import { RemindersAndCalendar } from "./RemindersAndCalendar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReminders,
  selectRemindersStatus,
} from "../features/reminders/remindersSlice";
import { Error } from "./Error";
import { useEffect } from "react";
import dayjs from "dayjs";
import { AppDispatch } from "../app/store";

export function Layout() {
  const remindersStatus = useSelector(selectRemindersStatus);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (remindersStatus === "idle") {
      const currentDate = dayjs().format("YYYY-MM");
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
      <Box sx={{ width: "1119px" }}>
        <CodelittLogo />
      </Box>
      <RemindersAndCalendar />
    </Box>
  );
}
