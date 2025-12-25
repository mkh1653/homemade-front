"use client";

import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpecialtyFormData,
  specialtyFormSchema,
} from "@/src/lib/schemas/specialty";
import { SpecialtyContext } from "../SpecialtyWrapper";
import { ActionsType, SelectedAction } from "./specialtyReducer";
import { serverFetch } from "@/src/lib/serverApi";

interface SpecialtyFormProps {
  onClose: () => void;
}

const setSpecialtyData = async ({ data, id }: { data: {}; id?: string }) => {
  if (id) {
    const url = `/specialty/${id}`;
    return await serverFetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } else {
    const url = `/specialty`;
    return await serverFetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
};

const SpecialtyForm: React.FC<SpecialtyFormProps> = ({ onClose }) => {
  const [state, dispatch] = useContext(SpecialtyContext);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecialtyFormData>({
    resolver: zodResolver(specialtyFormSchema),
    defaultValues: state.selected.specialty || {},
  });

  const { mutate } = useMutation({
    mutationFn: setSpecialtyData,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["specialty"] });
      dispatch({ type: ActionsType.SET_LOADING, payload: false });
    },
  });

  const onSubmit = async (data: SpecialtyFormData) => {
    dispatch({ type: ActionsType.SET_LOADING, payload: true });
    const { specialty } = state.selected;
    if (state.selected.action === SelectedAction.EDIT) {
      mutate({ id: specialty?.publicId, data });
    } else {
      mutate({ data });
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
