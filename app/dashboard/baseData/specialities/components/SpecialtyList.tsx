"use client";

import React, { useState } from "react";
import { useMutation } from "@/lib/clientApi";
import moment from "moment-jalaali";
import { Specialty } from "@/lib/schemas/specialty";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { convertNumbersToPersian } from "@/lib/utils/englishNumberToPersian";
import Modal from "../../../components/Modal";

interface SpecialtyListProps {
  initialSpecialties: Specialty[] | null;
  onEdit: (specialty: Specialty) => void;
}

const SpecialtyList: React.FC<SpecialtyListProps> = ({
  initialSpecialties,
  onEdit,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );
  const router = useRouter();
  const { mutate, loading } = useMutation();

  const handleConfirm = (specialty: Specialty) => {
    setIsConfirmOpen(true);
    setSelectedSpecialty(specialty);
  };

  const handleDelete = async () => {
    const deletedSpecialty = await mutate<Specialty>(
      `/specialty/${selectedSpecialty?.publicId}`,
      {
        method: "DELETE",
      }
    );
    if (deletedSpecialty) {
      // toast.success("تخصص با موفقیت حذف شد.");
      router.refresh();
    }
  };

  const handleActivity = async (specialty: Specialty) => {
    await mutate<Specialty>(`/specialty/${specialty.publicId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ isActive: !specialty.isActive }),
    });
    router.refresh();
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>نام</th>
            <th>توضیحات</th>
            <th>تاریخ ساخت</th>
            <th>آخرین تغییر</th>
            <th className="text-center">وضعیت</th>
            <th className='w-1/6 text-center'>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {initialSpecialties && initialSpecialties.map((specialty) => (
            <tr key={specialty.publicId} data-key={specialty.publicId}>
              <td className='text-xs'>{specialty.name}</td>
              <td className='text-xs'>{specialty.description}</td>
              <td>
                {convertNumbersToPersian(
                  moment(specialty.createdAt).format("jYYYY/jMM/jDD")
                )}
              </td>
              <td>
                {specialty.updatedAt
                  ? convertNumbersToPersian(
                      moment(specialty.updatedAt).format("jYYYY/jMM/jDD")
                    )
                  : "-"}
              </td>
              <td>
                <div className='flex items-center justify-center gap-2'>
                  <label className='toggle text-base-content'>
                    <input
                      type='checkbox'
                      checked={specialty.isActive}
                      onChange={() => handleActivity(specialty)}
                      disabled={loading}
                    />
                    <svg
                      aria-label='disabled'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='4'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path d='M18 6 6 18' />
                      <path d='m6 6 12 12' />
                    </svg>
                    <svg
                      aria-label='enabled'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'>
                      <g
                        strokeLinejoin='round'
                        strokeLinecap='round'
                        strokeWidth='4'
                        fill='none'
                        stroke='currentColor'>
                        <path d='M20 6 9 17l-5-5'></path>
                      </g>
                    </svg>
                  </label>
                  <div
                    className={`badge badg-soft badge-sm align-bottom ${
                      specialty.isActive ? "badge-success" : "badge-error"
                    }`}>
                    {specialty.isActive ? "فعال" : "غیر فعال"}
                  </div>
                </div>
              </td>
              <td className='text-center'>
                <div className='flex gap-2 justify-center'>
                  <button
                    className='btn btn-xs btn-info rounded-xl'
                    onClick={() => onEdit(specialty)}
                    disabled={loading}>
                    ویرایش
                  </button>
                  <button
                    className='btn btn-xs btn-error rounded-xl'
                    onClick={() => handleConfirm(specialty)}
                    disabled={loading}>
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isConfirmOpen && (
        <Modal onClose={handleConfirmClose} showModal={isConfirmOpen}>
          <div>
            <p className='mt-3 mb-8 text-sm'>
              آیا مطمئن هستید که می‌خواهید تخصص &nbsp;
              <span className='text-primary'>{selectedSpecialty?.name}</span>
              &nbsp; را حذف کنید؟
            </p>
            <div className='flex gap-2'>
              <button
                className='btn btn-neutral flex-1 rounded-xl'
                onClick={handleConfirmClose}>
                خیر
              </button>
              <button
                className='btn btn-error btn-wide rounded-xl'
                onClick={handleDelete}>
                بله
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SpecialtyList;
