"use client";
import React, { useState, useDeferredValue } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { getProvinces } from "./page";
import ProvinceList from "./ProvinceList";
import { Province } from "@/src/lib/schemas/province";
import Modal from "@/src/components/ui/Modal";
import Form from "./Form";

interface ProvinceWrapperProps {
  initialProvices: Province[] | undefined;
}

const ProvinceWrapper: React.FC<ProvinceWrapperProps> = ({
  initialProvices,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );

  const deferredSearch = useDeferredValue(search);

  const {
    data: provinces,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    initialData: initialProvices,
  });

  const filteredProvinces = provinces?.filter((province) =>
    province.name.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const closeHandle = () => {
    setShowForm(false);
  };

  const createProvinceHandle = () => {
    setShowForm(true);
    setFormTitle("استان جدید");
    setSelectedProvince(null);
  };

  const selectHandle = (province: Province) => {
    setSelectedProvince(province);
    setShowForm(true);
  };

  return (
    <>
      <div className='flex gap-3 my-6'>
        <button
          className='btn btn-primary rounded-xl'
          onClick={createProvinceHandle}>
          استان جدید
        </button>
        <input
          type='text'
          className='input'
          placeholder='نام استان را وارد کنید'
          onChange={searchHandle}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <ProvinceList list={filteredProvinces} selecting={selectHandle} />
      )}
      {showForm && (
        <Modal showModal={showForm} onClose={closeHandle} title={formTitle}>
          <Form onClose={closeHandle} initialData={selectedProvince} />
        </Modal>
      )}
    </>
  );
};

export default ProvinceWrapper;
