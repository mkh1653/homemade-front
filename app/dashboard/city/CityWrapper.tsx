"use client";
import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "./page";
import { getProvinces } from "../province/page";
import Loading from "./loading";
import CityList from "./CityList";
import Modal from "@/src/components/ui/Modal";
import Form from "./Form";
import { City } from "@/src/lib/schemas/city";

interface CityWrapperProps {
  initialCities: City[] | null;
}

const CityWrapper: React.FC<CityWrapperProps> = ({ initialCities }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const deferredSearch = useDeferredValue(search);

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  const {
    data: cities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    initialData: initialCities,
  });

  const filteredCities = cities?.filter(
    (city) =>
      city.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      city.province.name.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const closeHandle = () => {
    setShowForm(false);
  };

  const createCityHandle = () => {
    setShowForm(true);
    setFormTitle("شهر جدید");
    setSelectedCity(null);
  };

  const selectHandle = (city: City) => {
    setSelectedCity(city);
    setShowForm(true);
  };

  return (
    <>
      <div className='flex gap-3 my-6'>
        <button
          className='btn btn-primary rounded-xl'
          onClick={createCityHandle}>
          شهر جدید
        </button>
        <input
          type='text'
          className='input'
          placeholder='نام شهر را وارد کنید'
          onChange={searchHandle}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <CityList list={filteredCities} selecting={selectHandle} />
      )}
      {showForm && (
        <Modal showModal={showForm} onClose={closeHandle} title={formTitle}>
          <Form
            onClose={closeHandle}
            initialData={selectedCity}
            provinces={provinces}
          />
        </Modal>
      )}
    </>
  );
};

export default CityWrapper;
