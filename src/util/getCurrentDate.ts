import { getDayOfWeekName } from "./getDayOfWeekName";
import { getMonthName } from "./getMonthName";

export const getCurrentDate = () => {
  const currentDate = new Date();
  return `${getDayOfWeekName()}, ${getMonthName(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`;
};
