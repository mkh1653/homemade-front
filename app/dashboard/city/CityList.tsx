"use client";
import { useState } from "react";
import { City } from "@/src/lib/schemas/city";
import Modal from "@/src/components/ui/Modal";
import { serverFetch } from "@/src/lib/serverApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CityListProps {
  list?: City[];
  selecting: (city: City) => void;
}

const deleteCity = async (id: any) => {
  const method = "DELETE";
  const url = `/city/${id}`;
  await serverFetch(url, {
    method,
  });
};

const CityList: React.FC<CityListProps> = ({ list, selecting }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingCity, setDeletingCity] = useState<City | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      closeConfirm();
    },
  });

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const onDelete = (city: City) => {
    setShowConfirm(true);
    setDeletingCity(city);
  };

  const deleteHandle = () => {
    mutate(deletingCity?.publicId);
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {list &&
          list.map((city) => (
            <div
              className='card bg-neutral text-neutral-content shadow'
              key={city.publicId}>
              <div className='card-body'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold mb-3'>
                      <span>شهر</span>&nbsp;
                      <span>{city.name}</span>
                    </p>
                    <div>
                      <span>از استان:</span>&nbsp;
                      <span>{city.province.name}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <button
                      className='btn btn-accent btn-sm rounded-xl'
                      onClick={() => selecting(city)}>
                      ویرایش
                    </button>
                    <button
                      className='btn btn-error btn-sm rounded-xl'
                      onClick={() => onDelete(city)}>
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showConfirm && (
        <Modal showModal={showConfirm} onClose={closeConfirm}>
          <>
            <p className='mt-3 mb-8 text-sm'>
              آیا مطمئن هستید که می‌خواهید شهر &nbsp;
              <span className='text-primary'>{deletingCity?.name}</span>
              &nbsp; را حذف کنید؟
            </p>
            <div className='flex gap-2'>
              <button
                className='btn btn-neutral flex-1 rounded-xl'
                onClick={closeConfirm}>
                خیر
              </button>
              <button
                className='btn btn-error btn-wide rounded-xl'
                onClick={() => deleteHandle()}>
                بله
              </button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default CityList;
