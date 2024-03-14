import { Box, Typography } from "@mui/material";
import { getMonthName } from "../../../util/getMonthName";
import { CalendarBox } from "./CalendarBox";

export function CalendarContainer() {
  const year = new Date().getFullYear();
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
          {getMonthName()}
        </Typography>
      </Box>
      <CalendarBox />
      <Typography sx={{ color: "primary.main" }}>
        © 2022 Codelitt Inc All rights reserved
      </Typography>
    </Box>
  );
}
