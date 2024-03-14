import { Box, Typography } from "@mui/material";
import { IReminderFormatted } from "../interfaces";
import { ReactComponent as Clock } from "../../../assets/clock.svg";
import { ReactComponent as Edit } from "../../../assets/edit.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setReminderToEdit, setTab } from "../remindersSlice";

type IReminderModalProps = {
  reminder: IReminderFormatted;
};

export function ReminderModal({ reminder }: IReminderModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setReminderToEdit(reminder));
    dispatch(setTab("edit"));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "18px",
        width: "567px",
        height: "134px",
        padding: "10px",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
        margin: "20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          borderRadius: "6px",
          width: "12px",
          height: "111px",
          backgroundColor: `#${reminder.color}`,
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
          alignItems: "center",
          height: "100%",
          width: "100px",
        }}
      >
        <Clock />
        <Typography>{`${reminder.date.format("HH:mm")}`}</Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: "-18px",
          bottom: "-18px",
        }}
        onClick={() => handleEdit()}
      >
        <Edit />
      </Box>
    </Box>
  );
}
