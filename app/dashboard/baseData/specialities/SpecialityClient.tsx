"use client";

import React, { useState } from "react";
import { Specialty } from "@/lib/schemas/specialty";
import SpecialtyForm from "./components/SpecialtyForm";
import SpecialtyList from "./components/SpecialtyList";
import Modal from "../../components/Modal";

interface Props {
  initialSpecialties: Specialty[] | null;
}

export default function SpecialtyClient({ initialSpecialties }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );

  const handleOpenModal = (specialty: Specialty | null = null) => {
    setSelectedSpecialty(specialty);
    if (specialty) {
      setModalTitle("ویرایش تخصص");
    } else {
      setModalTitle("ساخت تخصص جدید");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSpecialty(null);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <button
          className='btn btn-primary rounded-lg'
          onClick={() => handleOpenModal()}>
          ساخت تخصص جدید
        </button>
      </div>

      <SpecialtyList
        initialSpecialties={initialSpecialties}
        onEdit={(specialty) => handleOpenModal(specialty)}
      />

      {isModalOpen && (
        <Modal
          title={modalTitle}
          onClose={handleCloseModal}
          showModal={isModalOpen}>
          <SpecialtyForm
            specialty={selectedSpecialty}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}
