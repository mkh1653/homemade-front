"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupporterMutation } from "@/src/hooks/supporter/useSupporterMutation";
import {
  supporterAuthFormSchema,
  supporterAuthFormData,
} from "@/src/lib/schemas/supporter";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import DatepickerInput from "@/src/components/ui/DatepickerInput";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { uploadAvatar } from "@/src/services/generalService";

const Create: React.FC = () => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(true);
  const { mutate } = useSupporterMutation("create");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<supporterAuthFormData>({
    resolver: zodResolver(supporterAuthFormSchema),
    defaultValues: {
      person: {
        birthday: undefined,
      },
    },
  });

  const accordionHandle = () => {
    setAccordionIsOpen((prev) => !prev);
  };

  const submitHandle = async (data: supporterAuthFormData) => {
    const { person } = data;
    let newData: any = { ...data };
    if (person.avatar) {
      const imageAddress = await uploadAvatar(person.avatar);
      newData = {
        ...data,
        person: {
          ...person,
          avatar: imageAddress?.url,
        },
      };
    }
    if (person.birthday) {
      const miladiDate = new DateObject({
        date: person.birthday,
        calendar: persian,
        locale: persian_fa,
      })
        .convert(gregorian, gregorian_en)
        .format();
      newData = {
        ...data,
        person: {
          ...newData.person,
          birthday: miladiDate,
        },
      };
    }
    mutate({ data: newData });
  };

  return (
    <div className='card bg-base-300 shadow'>
      <div className='card-body'>
        <form onSubmit={handleSubmit(submitHandle)}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3'>
            <fieldset className='fieldset'>
              <label className='label mb-1'>نام</label>
              <input
                type='text'
                className='input !rounded-lg w-full mb-1'
                {...register("person.firstName")}
              />
              {errors && (
                <p className='text-error text-xs'>
                  {errors.person?.firstName?.message}
                </p>
              )}
            </fieldset>
            <fieldset className='fieldset'>
              <label className='label mb-1'>نام خانوادگی</label>
              <input
                type='text'
                className='input !rounded-lg w-full mb-1'
                {...register("person.lastName")}
              />
              {errors && (
                <p className='text-error text-xs'>
                  {errors.person?.lastName?.message}
                </p>
              )}
            </fieldset>
            <fieldset className='fieldset'>
              <label className='label mb-1'>موبایل</label>
              <input
                type='text'
                className='input !rounded-lg w-full mb-1'
                {...register("person.phone")}
              />
              {errors && (
                <p className='text-error text-xs'>
                  {errors.person?.phone?.message}
                </p>
              )}
            </fieldset>
            <fieldset className='fieldset'>
              <label className='label mb-1'>ایمیل</label>
              <input
                type='text'
                className='input !rounded-lg w-full mb-1'
                {...register("email")}
              />
              {errors && (
                <p className='text-error text-xs'>{errors.email?.message}</p>
              )}
            </fieldset>
            <fieldset className='fieldset'>
              <label className='label mb-1'>رمزعبور</label>
              <input
                type='password'
                className='input !rounded-lg w-full mb-1'
                {...register("password")}
              />
              {errors && (
                <p className='text-error text-xs'>{errors.password?.message}</p>
              )}
            </fieldset>
          </div>
          {/* Accordion */}
          <div className='relative mb-4 mt-6'>
            <div
              className='flex items-center absolute right-4 top-4 z-40'
              onClick={accordionHandle}>
              <span>ارسال اطلاعات بیشتر</span>
              <div
                className='tooltip tooltip-primary'
                data-tip='از طریق این قسمت میتوانید اطلاعات پشتیبان را کامل تر وارد نمایید'>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className='mr-2 text-lg cursor-pointer'
                />
              </div>
            </div>
            <div className='collapse bg-base-200 border border-base-100'>
              <input
                type='checkbox'
                name='more-data'
                checked={accordionIsOpen}
                onChange={accordionHandle}
              />
              <div className='collapse-title font-semibold'>&nbsp;</div>
              <div className='collapse-content text-sm bg-base-300'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-3'>
                  <fieldset className='fieldset'>
                    <label className='label mb-1'>کد ملی</label>
                    <input
                      type='text'
                      className='input !rounded-lg w-full mb-1'
                      {...register("person.nationalityCode")}
                    />
                    {errors && (
                      <p className='text-error text-xs'>
                        {errors.person?.nationalityCode?.message}
                      </p>
                    )}
                  </fieldset>
                  <fieldset className='fieldset'>
                    <Controller
                      name='person.birthday'
                      control={control}
                      render={({ field }) => (
                        <DatepickerInput
                          label='تاریخ تولد'
                          field={field}
                          datepickerProps={{
                            maxDate: new DateObject().subtract(10, "years"),
                          }}
                        />
                      )}
                    />
                    {errors && (
                      <p className='text-error text-xs'>
                        {errors.person?.birthday?.message}
                      </p>
                    )}
                  </fieldset>
                  <fieldset className='fieldset'>
                    <label className='label mb-1'>عکس پروفایل</label>
                    <Controller
                      name='person.avatar'
                      control={control}
                      render={({ field }) => (
                        <input
                          type='file'
                          className='file-input'
                          accept='image/*'
                          onChange={(e) => {
                            field.onChange(e.target.files?.[0] || null);
                          }}
                        />
                      )}
                    />
                    {errors && (
                      <p className='text-error text-xs'>
                        {errors.person?.avatar?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <button className='btn btn-primary rounded-xl'>ساخت پشتیبان</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
