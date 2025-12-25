"use client";
import { ComponentProps, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import Datepicker from "./Datepicker";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface RHFProps<TFieldValues extends FieldValues>
  extends ControllerRenderProps<TFieldValues, Path<TFieldValues>> {}

interface DatepickerInput<TFieldValues extends FieldValues> {
  inputProps?: React.ComponentProps<"input">;
  label?: string;
  datepickerProps?: Omit<
    React.ComponentProps<typeof Datepicker>,
    "show" | "changeHandle" | "dateValue" | "closeHandle"
  >;
  field: RHFProps<TFieldValues>;
}

const DatepickerInput: React.FC<DatepickerInput<FieldValues>> = ({
  label,
  inputProps,
  datepickerProps,
  field,
}) => {
  const [show, setShow] = useState(false);

  const datepickerClose = () => {
    setShow(false);
  };

  const changeBirthdate = (value: DateObject | DateObject[] | null) => {
    field.onChange(value);
  };

  const value = datepickerProps?.maxDate
    ? datepickerProps?.maxDate
    : datepickerProps?.minDate
    ? datepickerProps?.minDate
    : null;

  return (
    <>
      {label && <label className='label mb-1'>{label}</label>}
      <input
        type='text'
        className='input !rounded-lg w-full mb-1'
        readOnly
        value={field.value ? String(field.value) : ""}
        onFocus={() => {
          setShow(true);
        }}
        name={field.name}
        ref={field.ref}
        {...inputProps}
      />
      <Datepicker
        show={show}
        dateValue={field.value ? field.value : value}
        closeHandle={datepickerClose}
        changeHandle={(value) => changeBirthdate(value)}
        {...datepickerProps}
      />
    </>
  );
};

export default DatepickerInput;
