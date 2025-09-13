import React from "react";
import BaseDataCard from "./components/BaseDataCard";

const BaseDataPage = () => {
  return (
    <div className='container'>
      <div className='grid grid-cols-3 gap-4'>
        <BaseDataCard
          title='مدیریت تخصص‌ها'
          desc='مشاهده و ویرایش و حذف تخصص‌ در این صفحه امکان پذیر می‌باشد'
          link='/dashboard/baseData/specialities/'
        />
        <BaseDataCard
          title='مدیریت استان'
          desc='مشاهده و ویرایش و حذف استان‌ها در این صفحه امکان پذیر می‌باشد'
          link='/dashboard/baseData/province/'
        />
        <BaseDataCard
          title='مدیریت شهر'
          desc='مشاهده و ویرایش و حذف شهرها در این صفحه امکان پذیر می‌باشد'
          link='/dashboard/baseData/city/'
        />
      </div>
    </div>
  );
};

export default BaseDataPage;
