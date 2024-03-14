import { Grid, Typography } from "@mui/material";
import { weekDays } from "../../../constants/weekDays";
import { monthsConfigurations } from "../../../constants/monthsConfiguration";

export function Calendar() {
  return (
    <Grid container columns={{ xs: 7 }}>
      {weekDays.map((day) => (
        <Grid item xs={1}>
          <Typography>{day}</Typography>
        </Grid>
      ))}
      {monthsConfigurations[new Date().getMonth()].map((day) => (
        <Grid item xs={1}>
          <Typography>{day}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
