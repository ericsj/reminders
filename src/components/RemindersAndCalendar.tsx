import { Box, Button, Grid, Typography } from "@mui/material";
import { getDayOfWeekName } from "../util/getDayOfWeekName";
import { getMonthName } from "../util/getMonthName";
import { NoReminder } from "../features/reminders/components/NoReminder";
import { CalendarBox } from "../features/calendar/components/CalendarBox";
import { CalendarContainer } from "../features/calendar/components/CalendarContainer";

export function RemindersAndCalendar() {
  const currentDate = `${getDayOfWeekName()}, ${getMonthName()} ${new Date().getDate()} ${new Date().getFullYear()}`;

  return (
    <Box
      sx={{
        display: "flex",
        width: "1119px",
        height: "686px",
        borderRadius: "40px",
        backgroundColor: "white",
      }}
    >
      <Grid
        container
        sx={{
          gridTemplateRows: "1fr 8fr 1fr",
          gridTemplateColumns: "1fr",
          width: "669px",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 40px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#384042",
              }}
            >
              {currentDate}
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #FF465D 0%, #BC46BA 100%)",
                width: "180px",
                height: "49px",
                fontSize: "16px",
                textTransform: "none",
                borderRadius: "0px 4px 4px 0px",
                color: "primary.main",
              }}
            >
              Add reminder
            </Button>
          </Box>
        </Grid>
        <NoReminder />
        <Grid item sx={{ visibility: "hidden" }}>
          Spacer
        </Grid>
      </Grid>
      <CalendarContainer />
    </Box>
  );
}
