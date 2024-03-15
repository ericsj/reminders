import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDay, selectMonth, selectDay } from "../calendarSlice";
import {
  refreshReminder,
  selectReminderDates,
} from "../../reminders/remindersSlice";
import { ReactComponent as NotificationPoint } from "../../../assets/point-reminder.svg";
import { AppDispatch } from "../../../app/store";

type IDayProps = {
  day: number;
};

export const Day = ({ day }: IDayProps) => {
  const selectedDay = useSelector(selectDay);
  const month = useSelector(selectMonth);
  const reminderDates = useSelector(selectReminderDates);
  const dispatch: AppDispatch = useDispatch();
  const dayHasEvents = reminderDates
    .map((date) => date.tz("GMT0").date())
    .includes(day);
  const handleClick = () => {
    dispatch(setDay(day));
    dispatch(refreshReminder({ month, day }));
  };
  const isSelected = selectedDay === day;
  return (
    <Grid
      item
      xs={1}
      onClick={() => handleClick()}
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          background: isSelected
            ? "linear-gradient(90deg, #FF465D 0%, #BC46BA 100%)"
            : "transparent",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
          }}
        >
          {day}
        </Typography>
      </Box>
      {dayHasEvents && (
        <NotificationPoint
          style={{
            position: "absolute",
            right: "6px",
            top: "6px",
          }}
        />
      )}
    </Grid>
  );
};
