import { Grid, Typography } from "@mui/material";
import { weekDays } from "../../../constants/weekDays";
import { monthsConfigurations } from "../../../constants/monthsConfiguration";
import { useSelector } from "react-redux";
import { selectMonth } from "../calendarSlice";
import { Day } from "./Day";

export function Calendar() {
  const currentMonthIndex = useSelector(selectMonth);

  return (
    <Grid
      container
      columns={{ xs: 7 }}
      sx={{ height: "207px", width: "300px" }}
    >
      {weekDays.map((day) => (
        <Grid item xs={1}>
          <Typography sx={{ textAlign: "center", color: "primary.main" }}>
            {day}
          </Typography>
        </Grid>
      ))}
      {monthsConfigurations[currentMonthIndex].map((day) =>
        day ? <Day day={day} /> : <Grid item xs={1}></Grid>
      )}
    </Grid>
  );
}
