import { getDayOfWeekName } from "./getDayOfWeekName";
import { getMonthName } from "./getMonthName";

export const getCurrentDate = () => {
  const currentDate = new Date();
  return `${getDayOfWeekName()}, ${getMonthName(currentDate.getMonth() + 1)} ${currentDate.getDate()} ${currentDate.getFullYear()}`;
};
