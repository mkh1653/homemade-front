"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverFetch } from "@/src/lib/serverApi";

import {
  Province,
  provinceForm,
  provinceFormSchema,
} from "@/src/lib/schemas/province";

interface FormProps {
  initialData: Province | null;
  onClose: () => void;
}

const provinceAction = async ({
  data,
  id,
}: {
  data: provinceForm;
  id?: any;
}) => {
  const method = id ? "PATCH" : "POST";
  const url = id ? `/province/${id}` : "/province";
  const res = await serverFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  return res;
};

const Form: React.FC<FormProps> = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<provinceForm>({
    resolver: zodResolver(provinceFormSchema),
    defaultValues: initialData || {},
  });

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: provinceAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provinces"] });
      onClose();
    },
  });

  const onAction = (data: provinceForm) => {
    if (initialData) {
      mutate({ data, id: initialData.publicId });
    } else {
      mutate({ data });
    }
  };

  return (
    <form onSubmit={handleSubmit(onAction)} method='dialog'>
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>نام استان</label>
        <input
          type='text'
          className='input !rounded-lg w-full mb-1'
          {...register("name")}
        />
        {errors && <p className='text-error text-xs'>{errors.name?.message}</p>}
      </fieldset>
      {/* {formType === "city" ? (
        <fieldset className='fieldset mb-3'>
          <legend className='fieldset-legend'>از استان:</legend>
          <select
            {...register("provinceId")}
            defaultValue='یک استان انتخاب کنید'
            className='select'>
            {provinces &&
              provinces.map((province) => (
                <option key={province.publicId} value={province.publicId}>
                  {province.name}
                </option>
              ))}
          </select>
          {"provinceId" in errors && errors.provinceId && (
            <p className='text-error text-xs'>{errors.provinceId?.message}</p>
          )}
        </fieldset>
      ) : null} */}
      <div className='flex justify-end gap-3'>
        <button className='btn btn-success btn-wide rounded-xl' type='submit'>
          ذخیره
        </button>
        <button
          type='button'
          className='btn btn-ghost rounded-xl flex-1'
          onClick={onClose}>
          انصراف
        </button>
      </div>
    </form>
  );
};

export default Form;
