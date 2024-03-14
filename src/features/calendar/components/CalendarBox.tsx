import { Box, CircularProgress } from "@mui/material";
import { Arrows } from "./Arrows";
import { Calendar } from "./Calendar";
import { Error } from "../../../components/Error";
import { selectRemindersStatus } from "../../reminders/remindersSlice";
import { useSelector } from "react-redux";

export function CalendarBox() {
  const status = useSelector(selectRemindersStatus);
  let content;
  switch (status) {
    case "loading":
      content = <CircularProgress />;
      break;
    case "succeeded":
      content = (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
            alignItems: "center",
          }}
        >
          <Arrows />
          <Calendar />
        </Box>
      );
      break;
    case "failed":
      content = <Error />;
      break;
  }
  return content;
}
