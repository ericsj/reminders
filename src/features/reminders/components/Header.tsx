import { Box, Button, Typography } from "@mui/material";
import { getCurrentDate } from "../../../util/getCurrentDate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setTab } from "../remindersSlice";

export const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100px",
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
    </Box>
  );
};
