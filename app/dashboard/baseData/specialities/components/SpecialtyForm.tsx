"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpecialtyFormData,
  specialtyFormSchema,
  Specialty,
} from "@/lib/schemas/specialty";

interface SpecialtyFormProps {
  specialty: Specialty | null;
  onClose: () => void;
}

const SpecialtyForm: React.FC<SpecialtyFormProps> = ({
  specialty,
  onClose,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecialtyFormData>({
    resolver: zodResolver(specialtyFormSchema),
    defaultValues: specialty || {},
  });

  const onSubmit = async (data: SpecialtyFormData) => {
    try {
      const response = await fetch(`/specialty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      onClose();

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to create specialty");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} method='dialog'>
        <fieldset className='fieldset mb-3'>
          <label className='label mb-1'>نام تخصص</label>
          <input
            type='text'
            className='input !rounded-lg w-full mb-1'
            {...register("name")}
          />
          {errors && (
            <p className='text-error text-xs'>{errors.name?.message}</p>
          )}
        </fieldset>
        <fieldset className='fieldset mb-3'>
          <label className='label mb-1'>شرح تخصص</label>
          <textarea
            className='textarea h-24 rounded-lg w-full mb-1'
            {...register("description")}></textarea>
          {errors && (
            <p className='text-error text-xs'>{errors.description?.message}</p>
          )}
        </fieldset>

        <div className='flex justify-end gap-3'>
          <button
            type='button'
            className='btn btn-ghost flex-1 rounded-xl'
            onClick={onClose}>
            انصراف
          </button>
          <button type='submit' className='btn btn-success btn-wide rounded-xl'>
            ذخیره
          </button>
        </div>
      </form>
    </>
  );
};

export default SpecialtyForm;
