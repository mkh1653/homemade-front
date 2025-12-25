import React, { useState, useContext, useEffect } from "react";
import Modal from "@/src/components/ui/Modal";
import SpecialtyForm from "./SpecialtyForm";
import { ActionsType, SelectedAction } from "./specialtyReducer";
import { SpecialtyContext } from "../SpecialtyWrapper";

const CreateSpecialty = () => {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(SpecialtyContext);

  useEffect(() => {
    if (state.selected.action === SelectedAction.CREATE) {
      setShow(true);
    }
  }, [state.selected.action]);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: ActionsType.SET_SELECTED,
      payload: { action: SelectedAction.NONE, specialty: null },
    });
  };
  return (
    <Modal title='ساخت تخصص جدید' onClose={handleClose} showModal={show}>
      <SpecialtyForm onClose={handleClose} />
    </Modal>
  );
};

export default CreateSpecialty;
