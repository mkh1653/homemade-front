import React from "react";

export default function Loading() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-base-content'>مدیریت تخصص‌ها</h1>
        <div className='skeleton h-12 w-40'></div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='skeleton w-1/3'></th>
              <th className='skeleton w-1/3'></th>
              <th className='skeleton w-1/6'></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div className='skeleton h-4 w-full'></div>
                </td>
                <td>
                  <div className='skeleton h-4 w-full'></div>
                </td>
                <td>
                  <div className='skeleton h-4 w-full'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
