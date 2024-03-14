import { Box, Typography } from "@mui/material";
import { getMonthName } from "../../../util/getMonthName";

export function CalendarContainer() {
  const year = new Date().getFullYear();
  return (
    <Box>
      <Box>
        <Typography sx={{ fontWeight: 800 }}>{year}</Typography>
        <Typography sx={{ fontWeight: 800 }}>{getMonthName()}</Typography>
      </Box>
    </Box>
  );
}
