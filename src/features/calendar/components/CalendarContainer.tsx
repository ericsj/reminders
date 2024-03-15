import { Box, CircularProgress, Typography } from "@mui/material";
import { getMonthName } from "../../../util/getMonthName";
import { CalendarBox } from "./CalendarBox";
import { useSelector } from "react-redux";
import { selectMonth } from "../calendarSlice";
import { Error } from "../../../components/Error";
import { selectRemindersStatus } from "../../reminders/remindersSlice";

export function CalendarContainer() {
  const year = new Date().getFullYear();
  const currentMonthIndex = useSelector(selectMonth);
  const status = useSelector(selectRemindersStatus);
  let content;
  switch (status) {
    case "loading":
      content = <CircularProgress />;
      break;
    case "succeeded":
      content = (
        <>
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "80px",
                color: "primary.main",
                textAlign: "center",
                height: "89px",
              }}
            >
              {year}
            </Typography>
            <Typography
              sx={{
                fontWeight: "Semi Bold",
                fontSize: "45px",
                color: "primary.main",
                textAlign: "center",
                height: "41px",
              }}
            >
              {getMonthName(currentMonthIndex)}
            </Typography>
          </Box>
          <CalendarBox />
          <Typography sx={{ color: "primary.main" }}>
            © 2024 Eric Jovelli
          </Typography>
        </>
      );
      break;
    case "failed":
      content = <Error />;
      break;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        background: "linear-gradient(180deg, #101277 0%, #421F91 100%)",
        alignItems: "center",
        borderRadius: "0 40px 40px 0",
        width: "450px",
      }}
    >
      {content}
    </Box>
  );
}
