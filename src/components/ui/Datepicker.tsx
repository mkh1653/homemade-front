"use client";
import React, {
  type ComponentProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { convertNumbersToPersian } from "@/src/lib/utils/englishNumberToPersian";

type DateValue = DateObject | DateObject[] | null;

interface DatepickerProps extends ComponentProps<typeof Calendar> {
  show: boolean;
  changeHandle: (value: DateObject | DateObject[] | null) => void;
  dateValue: DateObject | string | DateObject[] | null | undefined;
  closeHandle?: () => void;
}

const createSafeDateObject = (value: any): DateObject | null => {
  if (value instanceof DateObject) return value;
  if (value === null || value === undefined || value === "") return null;
  try {
    return new DateObject(value);
  } catch {
    return null;
  }
};

const Datepicker: React.FC<DatepickerProps> = ({
  show,
  closeHandle,
  dateValue: propDateValue,
  changeHandle,
  ...rest
}) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const safeDateValue: DateValue = useMemo(() => {
    if (rest.range) {
      return Array.isArray(propDateValue) ? propDateValue : [];
    }
    return createSafeDateObject(propDateValue);
  }, [propDateValue, rest.range]);

  const [prevValue, setPrevValue] = useState<DateValue>(safeDateValue);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (show) {
      setPrevValue(safeDateValue);
      if (typeof modalElement.showModal === "function") {
        modalElement.showModal();
      }
    } else {
      if (typeof modalElement.close === "function") {
        modalElement.close();
      }
    }
  }, [show, safeDateValue]);

  const onCancel = useCallback(() => {
    closeHandle && closeHandle();
  }, [changeHandle, prevValue, closeHandle]);

  const onVerify = useCallback(() => {
    changeHandle(prevValue);
    closeHandle && closeHandle();
  }, [closeHandle, prevValue]);

  const formatSingleDate = (date: DateObject | null) => {
    if (!date) return { year: "-", weekDay: "-", day: "-", month: "-" };

    const dateObj = date.setCalendar(persian).setLocale(persian_fa);

    return {
      year: convertNumbersToPersian(dateObj.year),
      weekDay: convertNumbersToPersian(dateObj.weekDay.name),
      day: convertNumbersToPersian(dateObj.day),
      month: convertNumbersToPersian(dateObj.month.name),
    };
  };

  const memoizedHeader = useMemo(() => {
    if (!rest.range) {
      const singleDate = safeDateValue as DateObject | null;
      const { year, weekDay, day, month } = formatSingleDate(singleDate);

      return (
        <div>
          <p className='text-xl font-bold mb-2'>{year}</p>
          <p className='text-2xl font-bold flex gap-2'>
            <span>{weekDay}</span>
            <span>{day}</span>
            <span>{month}</span>
          </p>
        </div>
      );
    } else {
      const rangeDates = safeDateValue as DateObject[];
      const startDate =
        rangeDates.length > 0 ? createSafeDateObject(rangeDates[0]) : null;
      const endDate =
        rangeDates.length > 1 ? createSafeDateObject(rangeDates[1]) : null;

      const start = formatSingleDate(startDate);
      const end = formatSingleDate(endDate);

      return (
        <div>
          <p className='text-lg font-bold flex gap-2 mb-3'>
            <span>از:</span>
            <span>
              {start.weekDay} {start.day} {start.month} {start.year}
            </span>
          </p>
          <p className='text-lg font-bold flex gap-2'>
            <span>تا:</span>
            <span>
              {end.weekDay} {end.day} {end.month} {end.year}
            </span>
          </p>
        </div>
      );
    }
  }, [safeDateValue, rest.range]);

  const renderButton = useCallback(
    (direction: "right" | "left", handleClick: () => void) => (
      <button className='btn btn-ghost btn-circle' onClick={handleClick}>
        {direction === "right" ? (
          <FontAwesomeIcon icon={faAngleLeft} />
        ) : (
          <FontAwesomeIcon icon={faAngleRight} />
        )}
      </button>
    ),
    []
  );

  if (!mounted || !show) return null;

  return createPortal(
    <dialog ref={modalRef} className='modal' onClose={onCancel} dir='rtl'>
      <div className='modal-box w-fit flex flex-col'>
        {memoizedHeader}
        <div className='divider'></div>
        <Calendar
          className='rmdp-mobile'
          calendar={persian}
          locale={persian_fa}
          value={safeDateValue}
          onChange={changeHandle as (value: DateObject | DateObject[]) => void}
          renderButton={renderButton}
          {...rest}
        />
        <div className='flex mt-4 mb-2 gap-3'>
          <button
            className='btn btn-soft btn-ghost rounded-xl'
            onClick={onCancel}>
            انصراف
          </button>
          <button
            className='btn btn-success btn-soft rounded-xl'
            onClick={onVerify}>
            تایید
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default Datepicker;
