import { Box, Typography } from "@mui/material";

export function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography sx={{ color: "primary.main" }}>
        Something went wrong. Try again later
      </Typography>
    </Box>
  );
}
