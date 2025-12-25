"use client";

import { useState } from "react";
import { Province } from "@/src/lib/schemas/province";
import { serverFetch } from "@/src/lib/serverApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/src/components/ui/Modal";

interface ProvinceListProps {
  list?: Province[];
  selecting: (provice: Province) => void;
}

const deleteProvince = async (id: any) => {
  const method = "DELETE";
  const url = `/province/${id}`;
  await serverFetch(url, {
    method,
  });
};

const ProvinceList: React.FC<ProvinceListProps> = ({ list, selecting }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingProvince, setDeletingProvince] = useState<Province | null>(
    null
  );
  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteProvince,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provinces"] });
      closeConfirm();
    },
  });

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const onDelete = (provice: Province) => {
    setShowConfirm(true);
    setDeletingProvince(provice);
  };

  const deleteHandle = () => {
    mutate(deletingProvince?.publicId);
  };
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {list &&
          list.map((province) => (
            <div
              className='card bg-neutral text-neutral-content shadow'
              key={province.publicId}>
              <div className='card-body'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold mb-3'>{province.name}</p>
                    <div>
                      <span>تعداد شهر:</span>&nbsp;
                      <span>{province.cities.length}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <button
                      className='btn btn-accent btn-sm rounded-xl'
                      onClick={() => selecting(province)}>
                      ویرایش
                    </button>
                    <button
                      className='btn btn-error btn-sm rounded-xl'
                      onClick={() => onDelete(province)}>
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
              آیا مطمئن هستید که می‌خواهید استان &nbsp;
              <span className='text-primary'>{deletingProvince?.name}</span>
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

export default ProvinceList;
