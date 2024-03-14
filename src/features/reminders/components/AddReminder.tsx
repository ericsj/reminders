import {
  Box,
  Button,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { getCurrentDate } from "../../../util/getCurrentDate";
import { Field, Form, Formik, FormikProps } from "formik";
import { reminderInitial } from "../../../constants/reminderInitial";
import { IReminderFormatted } from "../interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addReminder } from "../remindersSlice";
import { reminderColors } from "../../../constants/reminderColors";

export const AddReminder = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Formik
      initialValues={reminderInitial}
      onSubmit={async (values) => dispatch(addReminder(values))}
    >
      {(props: FormikProps<IReminderFormatted>) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              rowGap: "40px",
              padding: "0 40px 0 40px",
              width: "669px",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#384042",
              }}
            >
              {`Add Reminder - ${getCurrentDate()}`}
            </Typography>
            <Field name="name">
              {({ field, meta }) => (
                <FormGroup>
                  <FormLabel>Title</FormLabel>
                  <TextField
                    required
                    size="small"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    placeholder="Title"
                    {...field}
                  />
                </FormGroup>
              )}
            </Field>
            <Field name="description">
              {({ field, meta }) => (
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    size="small"
                    required
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    placeholder="Title"
                    {...field}
                  />
                </FormGroup>
              )}
            </Field>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Field name="Date">
                {({ field, meta }) => (
                  <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <TextField
                      required
                      size="small"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      placeholder="MM/DD/YYYY"
                      {...field}
                    />
                  </FormGroup>
                )}
              </Field>
              <Field name="TIME">
                {({ field, meta }) => (
                  <FormGroup>
                    <FormLabel>TIME</FormLabel>
                    <TextField
                      required
                      size="small"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      placeholder="HH:MM"
                      {...field}
                    />
                  </FormGroup>
                )}
              </Field>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {reminderColors.map((color) => (
                <Box
                  sx={{
                    width: "55px",
                    height: "48px",
                    borderRadius: "6%",
                    border: "1px solid rgba(49,39,37,0.4)",
                    backgroundColor: color,
                  }}
                ></Box>
              ))}
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", columnGap: "5px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.A100",
                    color: "primary.main",
                    width: "123px",
                    height: "49px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "secondary.A100",
                    color: "primary.main",
                    width: "108px",
                    height: "49px",
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
