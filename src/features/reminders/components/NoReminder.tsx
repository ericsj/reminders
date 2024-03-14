import { Grid, Typography } from "@mui/material";
import { ReactComponent as CalendarLogo } from "../../../assets/calendar-logo.svg";

export function NoReminder() {
  return (
    <Grid
      item
      xs={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CalendarLogo />
      <Typography
        sx={{ fontSize: "21px", color: "info.main", fontWeight: 600 }}
      >
        No reminders registered so far
      </Typography>
    </Grid>
  );
}
