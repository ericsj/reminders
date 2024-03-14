import { Box, Typography } from "@mui/material";
import { IReminderFormatted } from "./interfaces";
import { ReactComponent as Clock } from "../../assets/Clock.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";

type IReminderModalProps = {
  reminder: IReminderFormatted;
};

export function ReminderModal({ reminder }: IReminderModalProps) {
  return (
    <Box
      sx={{
        borderRadius: "18px",
        width: "567px",
        height: "134px",
      }}
    >
      <Box
        sx={{
          borderRadius: "100%",
          width: "12px",
          height: "111px",
          backgroundColor: reminder.color,
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "412px",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "info.main", fontSize: "14px" }}>
          {reminder.title}
        </Typography>
        <Typography sx={{ color: "secondary.main", fontSize: "18px" }}>
          {reminder.description}
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: "1px solid #D1DCF0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          width: "100px",
        }}
      >
        <Clock />
        <Typography>{`${reminder.date.format("HH:mm")}`}</Typography>
        <Box sx={{ marginRight: "-10px", marginBottom: "-10px" }}>
          <Edit />
        </Box>
      </Box>
    </Box>
  );
}
