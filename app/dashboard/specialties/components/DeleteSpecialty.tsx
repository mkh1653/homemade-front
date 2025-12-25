import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/src/components/ui/Modal";
import { SelectedAction, ActionsType } from "./specialtyReducer";
import { SpecialtyContext } from "../SpecialtyWrapper";
import { serverFetch } from "@/src/lib/serverApi";

const deleteSpecialty = async (id: string) => {
  const url = `/specialty/${id}`;
  return await serverFetch(url, {
    method: "DELETE",
  });
};

const DeleteSpecialty: React.FC = () => {
  const [state, dispatch] = useContext(SpecialtyContext);
  const [show, setShow] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.selected.action === SelectedAction.DELETE) {
      setShow(true);
    }
  }, [state.selected.action]);

  const closeHandle = () => {
    setShow(false);
    dispatch({
      type: ActionsType.SET_SELECTED,
      payload: { action: SelectedAction.NONE, specialty: null },
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialty"] });
      closeHandle();
      dispatch({
        type: ActionsType.SET_SELECTED,
        payload: { action: SelectedAction.NONE, specialty: null },
      });
      dispatch({ type: ActionsType.SET_LOADING, payload: false });
    },
  });

  const handleDelete = () => {
    dispatch({ type: ActionsType.SET_LOADING, payload: true });
    mutate(state.selected.specialty?.publicId!);
  };

  return (
    <Modal onClose={closeHandle} showModal={show}>
      <div>
        <p className='mt-3 mb-8 text-sm'>
          آیا مطمئن هستید که می‌خواهید تخصص &nbsp;
          <span className='text-primary'>{state.selected.specialty?.name}</span>
          &nbsp; را حذف کنید؟
        </p>
        <div className='flex gap-2'>
          <button
            className='btn btn-neutral flex-1 rounded-xl'
            onClick={closeHandle}>
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
  );
};

export default DeleteSpecialty;
