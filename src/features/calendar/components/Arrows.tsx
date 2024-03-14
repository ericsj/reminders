import { Box } from "@mui/material";
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../../assets/chevron-right.svg";
import { ReactComponent as PointNav } from "../../../assets/point-navigation.svg";

export function Arrows() {
  return (
    <Box sx={{ columnGap: "5px" }}>
      <ChevronLeft />
      <PointNav />
      <ChevronRight />
    </Box>
  );
}
