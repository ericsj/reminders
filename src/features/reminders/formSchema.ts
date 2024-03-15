import * as yup from "yup";

export const formSchema = yup.object().shape({
  date: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/,
      "Invalid date format (mm/dd/yyyy)"
    )
    .required("Date is required"),
  title: yup.string().max(70, "Text must be at most 70 characters long"),
  description: yup
    .string()
    .max(190, "Text must be at most 190 characters long"),
  time: yup
    .string()
    .matches(/^(0\d|1[0-9]|2[0-3]):([0-5]\d)$/, "Invalid time format (hh:mm)")
    .required("Time is required"),
});
