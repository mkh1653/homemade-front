import React from "react";

export default function Loading() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex justify-between items-stretch'>
        <div className='skeleton w-96 h-10'></div>
        <div className='flex gap-3'>
          <div className='skeleton w-40'></div>
          <div className='skeleton w-40'></div>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <tbody>
            {[...Array(50)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div className='skeleton h-4 w-full m-1'></div>
                </td>
                <td className='w-2/6'>
                  <div className='skeleton h-4 w-full m-1'></div>
                </td>
                <td>
                  <div className='skeleton h-4 w-full m-1'></div>
                </td>
                <td>
                  <div className='skeleton h-4 w-full m-1'></div>
                </td>
                <td>
                  <div className='skeleton h-4 w-full m-1'></div>
                </td>
                <td>
                  <div className='skeleton h-4 w-full m-1'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
