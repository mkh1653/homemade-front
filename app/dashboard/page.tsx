import React from "react";
import InfoCard from "../../src/components/InfoCard";

const DashboardPage = async () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* بخش آمار و اطلاعات */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* کارت آمار ۱ */}
        <InfoCard
          title='پروژه‌های فعال'
          content={<p className='text-4xl font-bold'>24</p>}
        />

        {/* کارت آمار ۲ */}
        <InfoCard
          title='درآمد این ماه'
          content={<p className='text-4xl font-bold'>$5,400</p>}
        />

        {/* کارت آمار ۳ */}
        <InfoCard
          title='نظرات جدید'
          content={<p className='text-4xl font-bold'>3</p>}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
