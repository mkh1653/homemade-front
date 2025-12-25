"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverFetch } from "@/src/lib/serverApi";

import { City, cityForm, cityFormSchema } from "@/src/lib/schemas/city";
import { Province } from "@/src/lib/schemas/province";

interface FormProps {
  provinces: Province[] | undefined;
  initialData: City | null;
  onClose: () => void;
}

const cityAction = async ({ data, id }: { data: cityForm; id?: string }) => {
  const method = id ? "PATCH" : "POST";
  const url = id ? `/city/${id}` : "/city";
  const res = await serverFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  return res;
};

const Form: React.FC<FormProps> = ({ initialData, onClose, provinces }) => {
  const queryClient = useQueryClient();

  const defaultValues = {
    name: initialData?.name,
    provinceId: initialData?.province.publicId,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<cityForm>({
    resolver: zodResolver(cityFormSchema),
    defaultValues,
  });

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: cityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      onClose();
    },
  });

  const onAction = (data: cityForm) => {
    if (initialData) {
      mutate({ data, id: initialData.publicId });
    } else {
      mutate({ data });
    }
  };

  return (
    <form onSubmit={handleSubmit(onAction)} method='dialog'>
      <fieldset className='fieldset mb-3'>
        <legend className='fieldset-legend'>از استان:</legend>
        <select
          {...register("provinceId")}
          defaultValue='یک استان انتخاب کنید'
          className='select w-full !pr-3'>
          <option disabled={true} hidden>
            یک استان انتخاب کنید
          </option>
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
      <fieldset className='fieldset mb-3'>
        <label className='label mb-1'>نام شهر</label>
        <input
          type='text'
          className='input !rounded-lg w-full mb-1'
          {...register("name")}
        />
        {errors && <p className='text-error text-xs'>{errors.name?.message}</p>}
      </fieldset>

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
