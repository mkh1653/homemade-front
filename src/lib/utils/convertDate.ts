import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";

export const toJalali = (date: string): string => {
  return new DateObject({
    date,
    calendar: gregorian,
    locale: gregorian_en,
  })
    .convert(persian, persian_fa)
    .format();
};

export const toMiladi = (date: string): string => {
  return new DateObject({
    date,
    calendar: persian,
    locale: persian_fa,
  })
    .convert(gregorian, gregorian_en)
    .format();
};
