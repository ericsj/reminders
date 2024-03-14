import { Box, Typography } from "@mui/material";
import { ReactComponent as CalendarLogo } from "../../../assets/calendar-logo.svg";

export function NoReminder() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
      }}
    >
      <CalendarLogo />
      <Typography
        sx={{ fontSize: "21px", color: "info.main", fontWeight: 600 }}
      >
        No reminders registered so far
      </Typography>
    </Box>
  );
}
