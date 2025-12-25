import React, { useState, useContext, useEffect } from "react";
import Modal from "@/src/components/ui/Modal";
import SpecialtyForm from "./SpecialtyForm";
import { ActionsType, SelectedAction } from "./specialtyReducer";
import { SpecialtyContext } from "../SpecialtyWrapper";

const EditSpecialty: React.FC = () => {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(SpecialtyContext);

  useEffect(() => {
    if (state.selected.action === SelectedAction.EDIT) {
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
    <Modal title='ویرایش تخصص' onClose={handleClose} showModal={show}>
      <SpecialtyForm onClose={handleClose} />
    </Modal>
  );
};

export default EditSpecialty;
