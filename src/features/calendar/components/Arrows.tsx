import { Box } from "@mui/material";
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../../assets/chevron-right.svg";
import { ReactComponent as PointNav } from "../../../assets/point-navigation.svg";
import { useDispatch, useSelector } from "react-redux";
import { move, selectMonth } from "../calendarSlice";
import {
  fetchReminders,
  setReminderStatus,
} from "../../reminders/remindersSlice";
import dayjs from "dayjs";
import { AppDispatch } from "../../../app/store";

export function Arrows() {
  const dispatch: AppDispatch = useDispatch();
  const newMonth = useSelector(selectMonth);
  const handleClick = (direction: number) => {
    if (newMonth > 0 && newMonth < 11) {
      dispatch(setReminderStatus("loading"));
      const newMonthQuery = `${dayjs().format("YYYY")}-${`0${newMonth}`.slice(-2)}`;
      dispatch(fetchReminders(newMonthQuery));
      if (direction === 1) {
        dispatch(move(1));
      } else {
        dispatch(move(-1));
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "5px",
        width: "70px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ChevronLeft onClick={() => handleClick(-1)} />
      <PointNav />
      <ChevronRight onClick={() => handleClick(1)} />
    </Box>
  );
}
