"use client";

import React, { useReducer, createContext, useState } from "react";
import {
  useQuery,
  keepPreviousData,
  QueryFunctionContext,
} from "@tanstack/react-query";
import SpecialtyList from "./components/SpecialtyList";
import Drawer from "@/src/components/ui/Drawer";
import FilterForm from "./components/FilterForm";
import CreateSpecialty from "./components/CreateSpecialty";
import DeleteSpecialty from "./components/DeleteSpecialty";
import EditSpecialty from "./components/EditSpecialty";

import { SpecialtyResponse } from "./page";
import {
  reducer,
  ACtion,
  ActionsType,
  initialState,
  SpecialtyState,
  SelectedAction,
} from "./components/specialtyReducer";
import { serverFetch } from "@/src/lib/serverApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface SpecialtyProps {
  initialSpecialtiesRes: SpecialtyResponse | null;
}

const fetchSpecialty = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>) => {
  const params = queryKey?.[1] ?? {};
  const { filter, search, limit, page } = params ?? {};

  const query = new URLSearchParams({
    filters: JSON.stringify(filter) || "",
    search: search || "",
    limit: limit?.toString() ?? "",
    page: page?.toString() ?? "",
  });

  const url = `/specialty?${query.toString()}`;
  return await serverFetch<SpecialtyResponse>(url, {
    method: "GET",
  });
};

const noop = () => {
  throw new Error("Dispatch called outside of Provider!");
};

export const SpecialtyContext = createContext<
  [SpecialtyState, React.Dispatch<ACtion>]
>([initialState, noop]);

export default function SpecialtyWrapper({
  initialSpecialtiesRes,
}: SpecialtyProps) {
  const [inputSearch, setInputSearch] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter, search, limit, page } = state;

  const { data: specialtyData } = useQuery({
    queryKey: [
      "specialty",
      {
        filter: filter,
        search: search,
        limit: limit,
        page: page,
      },
    ] as const,
    queryFn: fetchSpecialty,
    placeholderData: keepPreviousData,
    initialData: initialSpecialtiesRes,
  });

  const globalSearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onSearchClick = () => {
    dispatch({
      type: ActionsType.SET_SEARCH,
      payload: inputSearch,
    });
  };

  return (
    <SpecialtyContext.Provider value={[state, dispatch]}>
      <div className='flex flex-col gap-6'>
        <div className='flex items-stretch gap-3'>
          <div className='min-w-96 join'>
            <input
              type='text'
              className='input w-full rounded-r-md!'
              placeholder='جست و جوی نام یا توضیح تخصص'
              value={inputSearch}
              onChange={globalSearchHandle}
            />
            <button
              className='btn btn-primary join-item'
              onClick={onSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size='1x' />
            </button>
          </div>
          <div className='flex mr-auto gap-3'>
            <label htmlFor='my-drawer' className='btn btn-accent rounded-xl'>
              <span>جست و جوی پیشرفته</span>
              <FontAwesomeIcon icon={faFilter} size='1x' />
            </label>
            <button
              className='btn btn-primary rounded-xl'
              onClick={() =>
                dispatch({
                  type: ActionsType.SET_SELECTED,
                  payload: { action: SelectedAction.CREATE, specialty: null },
                })
              }>
              <span>ساخت تخصص جدید</span>
              <FontAwesomeIcon icon={faPlus} size='1x' />
            </button>
          </div>
        </div>

        {specialtyData && (
          <SpecialtyList
            specialties={specialtyData.data}
            total={specialtyData.total}
          />
        )}

        <Drawer side='end' id='my-drawer' size='md'>
          <FilterForm id='my-drawer' />
        </Drawer>

        {state.selected.action === SelectedAction.CREATE && <CreateSpecialty />}
        {state.selected.action === SelectedAction.EDIT && <EditSpecialty />}
        {state.selected.action === SelectedAction.DELETE && <DeleteSpecialty />}
      </div>
    </SpecialtyContext.Provider>
  );
}
