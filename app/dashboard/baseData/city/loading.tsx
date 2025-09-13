import React from "react";

export default function Loading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {[...Array(12)].map((item, i) => (
        <div className='skeleton w-full h-[120px]' key={i}></div>
      ))}
    </div>
  );
}
