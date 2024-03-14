import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectDay, selectSelectedDay } from "../calendarSlice";
import { selectReminderDates } from "../../reminders/remindersSlice";
import { ReactComponent as NotificationPoint } from "../../../assets/point-reminder.svg";

type IDayProps = {
  day: number;
};

export const Day = ({ day }: IDayProps) => {
  const selectedDay = useSelector(selectSelectedDay);
  const reminderDates = useSelector(selectReminderDates);
  const dispatch = useDispatch();
  const dayHasEvents = reminderDates.map((date) => date.date()).includes(day);
  const isSelected = selectedDay === day;
  return (
    <Grid
      item
      xs={1}
      onClick={() => dispatch(selectDay(day))}
      sx={{
        display: "flex",
        justifyContent: "center",
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
        <Box
          sx={{
            position: "absolute",
            marginRight: "-35px",
            display: "flex",
            boxSizing: "border-box",
          }}
        >
          <NotificationPoint />
        </Box>
      )}
    </Grid>
  );
};
