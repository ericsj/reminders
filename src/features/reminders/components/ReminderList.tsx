import { useDispatch, useSelector } from "react-redux";
import { selectAllReminders, setTab } from "../remindersSlice";
import { ReminderModal } from "../ReminderModal";
import { NoReminder } from "./NoReminder";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getCurrentDate } from "../../../util/getCurrentDate";
import { AppDispatch } from "../../../app/store";

export function ReminderList() {
  const remindersStatus = useSelector(selectAllReminders);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        width: "669px",
      }}
    >
      <Grid
        item
        xs
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
            {getCurrentDate()}
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #FF465D 0%, #BC46BA 100%)",
              width: "180px",
              height: "49px",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "4px ",
              color: "primary.main",
            }}
            onClick={() => dispatch(setTab("add"))}
          >
            Add reminder
          </Button>
        </Box>
      </Grid>
      {remindersStatus.length === 0 ? (
        <NoReminder />
      ) : (
        remindersStatus.map((reminder) => <ReminderModal reminder={reminder} />)
      )}
      <Grid item xs></Grid>
    </Grid>
  );
}
