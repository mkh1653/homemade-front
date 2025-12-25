"use client";
import React, { useState, useEffect, useContext } from "react";
import { ActionsType } from "./specialtyReducer";
import { SpecialtyContext } from "../SpecialtyWrapper";
import Datepicker from "@/src/components/ui/Datepicker";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

interface FilterFormProps {
  id: string;
}

type DateState = {
  show: boolean;
  value: DateObject[];
};

const FilterForm: React.FC<FilterFormProps> = ({ id }) => {
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [createDate, setCreateDate] = useState<DateState>({
    show: false,
    value: [],
  });
  const [updateDate, setUpdateDate] = useState<DateState>({
    show: false,
    value: [],
  });
  const [, dispatch] = useContext(SpecialtyContext);

  useEffect(() => {
    if (!createDate.show || !updateDate.show) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [createDate.show, updateDate.show]);

  const closeHandle = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    input.checked = false;
  };

  const onVerify = () => {
    let createdAt = {};
    let updatedAt = {};
    if (createDate.value.length) {
      createdAt = {
        gte: createDate.value[0]
          .setCalendar(gregorian)
          .setLocale(gregorian_en)
          .format("YYYY/MM/DD"),
        lte: createDate.value[1]
          .setCalendar(gregorian)
          .setLocale(gregorian_en)
          .format("YYYY/MM/DD"),
      };
    }
    if (updateDate.value.length) {
      updatedAt = {
        gte: updateDate.value[0]
          .setCalendar(gregorian)
          .setLocale(gregorian_en)
          .format("YYYY/MM/DD"),
        lte: updateDate.value[1]
          .setCalendar(gregorian)
          .setLocale(gregorian_en)
          .format("YYYY/MM/DD"),
      };
    }
    if (
      name ||
      isActive ||
      createDate.value.length ||
      updateDate.value.length ||
      desc
    ) {
      dispatch({
        type: ActionsType.SET_FILTER,
        payload: {
          isActive,
          name,
          description: desc,
          createdAt,
          updatedAt,
        },
      });
    }
    closeHandle();
  };

  const stateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") setIsActive(undefined);
    if (e.target.value === "active") setIsActive(true);
    if (e.target.value === "deactive") setIsActive(false);
  };

  const createDatehandle = (param: {
    value?: DateObject[];
    visibility?: boolean;
  }) => {
    const { value, visibility } = param;
    if (value) {
      setCreateDate((prevValue) => {
        return { ...prevValue, value: value };
      });
    }
    if (visibility !== undefined) {
      setCreateDate((prevValue) => {
        return { ...prevValue, show: visibility };
      });
    }
  };

  const updateDatehandle = (param: {
    value?: DateObject[];
    visibility?: boolean;
  }) => {
    const { value, visibility } = param;
    if (value) {
      setUpdateDate((prevValue) => {
        return { ...prevValue, value: value };
      });
    }

    if (visibility !== undefined) {
      setUpdateDate((prevValue) => {
        return { ...prevValue, show: visibility };
      });
    }
  };

  return (
    <div className='flex flex-col'>
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>وضعیت</label>
        <div className='filter gap-1.5'>
          <input
            className='btn btn-sm btn-info btn-outline rounded-lg filter-reset'
            type='radio'
            name='state'
            aria-label='All'
            value='all'
            onChange={stateChange}
          />
          <input
            className='btn btn-sm btn-info btn-outline rounded-lg'
            type='radio'
            name='state'
            aria-label='نمایش فعال‌ها'
            value='active'
            onChange={stateChange}
          />
          <input
            className='btn btn-sm btn-info btn-outline rounded-lg'
            type='radio'
            name='state'
            aria-label='نمایش غیر فعال‌ها'
            value='deactive'
            onChange={stateChange}
          />
        </div>
      </fieldset>
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>نام</label>
        <input
          type='text'
          className='input w-full'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>توضیح</label>
        <input
          type='text'
          className='input w-full'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </fieldset>
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>تاریخ ساخت</label>
        <input
          type='text'
          className='input w-full'
          readOnly
          value={`${createDate.value[0] ? `از ${createDate.value[0]}` : ""} ${
            createDate.value[1] ? `تا ${createDate.value[1]}` : ""
          }`}
          onFocus={() => createDatehandle({ visibility: true })}
        />
      </fieldset>
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>آخرین تغییر</label>
        <input
          type='text'
          className='input w-full'
          readOnly
          value={`${updateDate.value[0] ? `از ${updateDate.value[0]}` : ""} ${
            updateDate.value[1] ? `تا ${updateDate.value[1]}` : ""
          }`}
          onFocus={() => updateDatehandle({ visibility: true })}
        />
      </fieldset>
      <div className='flex gap-3 mt-3'>
        <button
          className='btn btn-success btn-soft rounded-xl'
          onClick={onVerify}>
          تایید
        </button>
        <button
          className='btn btn-ghost btn-soft rounded-xl'
          onClick={closeHandle}>
          انصراف
        </button>
      </div>
      <Datepicker
        range
        dateValue={createDate.value}
        changeHandle={(value) =>
          createDatehandle({ value } as { value: DateObject[] })
        }
        show={createDate.show}
        closeHandle={() => createDatehandle({ visibility: false })}
        maxDate={new DateObject()}
      />
      <Datepicker
        range
        dateValue={updateDate.value}
        changeHandle={(value) =>
          updateDatehandle({ value } as { value: DateObject[] })
        }
        show={updateDate.show}
        closeHandle={() => updateDatehandle({ visibility: false })}
        maxDate={new DateObject()}
      />
    </div>
  );
};

export default FilterForm;
