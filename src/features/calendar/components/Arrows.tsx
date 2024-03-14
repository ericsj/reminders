import { Box } from "@mui/material";
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../../assets/chevron-right.svg";
import { ReactComponent as PointNav } from "../../../assets/point-navigation.svg";
import { useChangeMonth } from "../useChangeMonth";

export function Arrows() {
  const changeMonth = useChangeMonth();

  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "5px",
        width: "70px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ChevronLeft onClick={() => changeMonth(-1)} />
      <PointNav />
      <ChevronRight onClick={() => changeMonth(1)} />
    </Box>
  );
}
