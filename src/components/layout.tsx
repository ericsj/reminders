import { Box, CircularProgress } from "@mui/material";
import { ReactComponent as CodelittLogo } from "../assets/codelitt-logo.svg";
import { RemindersAndCalendar } from "./RemindersAndCalendar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReminders,
  getRemindersStatus,
} from "../features/reminders/remindersSlice";
import { Error } from "./Error";
import { useEffect } from "react";

export function Layout() {
  const remindersStatus = useSelector(getRemindersStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (remindersStatus === "idle") {
      dispatch(fetchReminders() as any);
    }
  }, [remindersStatus, dispatch]);

  let remindersContent;
  switch (remindersStatus) {
    case "loading":
      remindersContent = <CircularProgress />;
      break;
    case "succeeded":
      remindersContent = (
        <>
          <Box sx={{ width: "1119px" }}>
            <CodelittLogo />
          </Box>
          <RemindersAndCalendar />
        </>
      );
      break;
    case "failed":
      remindersContent = <Error />;
      break;
  }
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
      {remindersContent}
    </Box>
  );
}
