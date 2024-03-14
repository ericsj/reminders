import { Box } from "@mui/material";
import { Arrows } from "./Arrows";
import { Calendar } from "./Calendar";

export function CalendarBox() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
      }}
    >
      <Arrows />
      <Calendar />
    </Box>
  );
}
