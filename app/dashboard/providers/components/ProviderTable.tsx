"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Rating from "../../../../src/components/ui/Rating";

interface Provider {
  id: string;
  name: string;
  skills: string[];
  rating: number;
}

interface ProviderTableProps {
  providers: Provider[];
}

const ProviderTable: React.FC<ProviderTableProps> = ({ providers }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/providers/${id}`);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>نام</th>
            <th>مهارت‌ها</th>
            <th>امتیاز</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr
              key={provider.id}
              className='hover:bg-base-300 transition-colors duration-200 cursor-pointer'
              onClick={() => handleRowClick(provider.id)}>
              <td>{provider.name}</td>
              <td>
                {provider.skills.map((skill, index) => (
                  <div key={index} className='badge badge-primary mr-1'>
                    {skill}
                  </div>
                ))}
              </td>
              <td>
                <Rating rate={provider.rating} size='sm' readonly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderTable;
