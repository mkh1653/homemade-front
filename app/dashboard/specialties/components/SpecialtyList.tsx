"use client";

import React, { useContext } from "react";
import moment from "moment-jalaali";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverFetch } from "@/src/lib/serverApi";

import { ActionsType, SelectedAction } from "./specialtyReducer";
import { SpecialtyContext } from "../SpecialtyWrapper";
import { Specialty } from "@/src/lib/schemas/specialty";
import { convertNumbersToPersian } from "@/src/lib/utils/englishNumberToPersian";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface SpecialtyListProps {
  specialties: Specialty[];
  total: number;
}

const changeIsActive = async ({ id, data }: { id: string; data: object }) => {
  const url = `/specialty/${id}`;
  return await serverFetch(url, {
    body: JSON.stringify(data),
    method: "PATCH",
  });
};

const SpecialtyList: React.FC<SpecialtyListProps> = ({
  specialties,
  total,
}) => {
  const [state, dispatch] = useContext(SpecialtyContext);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: changeIsActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialty"] });
      dispatch({ type: ActionsType.SET_LOADING, payload: false });
    },
  });

  const changeSpecialtyState = (specialty: Specialty) => {
    dispatch({ type: ActionsType.SET_LOADING, payload: true });
    mutate({ id: specialty.publicId, data: { isActive: !specialty.isActive } });
  };

  const changeLimit = (limit: number) => {
    const elem = document.activeElement;
    if (elem) {
      (elem as HTMLDivElement)?.blur();
    }
    dispatch({
      type: ActionsType.SET_LIMIT,
      payload: limit,
    });
  };

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>نام</th>
              <th>توضیح</th>
              <th>تاریخ ساخت</th>
              <th>آخرین تغییر</th>
              <th className='text-center'>وضعیت</th>
              <th className='w-1/6 text-center'>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {specialties &&
              specialties.map((specialty) => (
                <tr key={specialty.publicId} data-key={specialty.publicId}>
                  <td className='text-xs'>{specialty.name}</td>
                  <td className='text-xs'>{specialty.description}</td>
                  <td>
                    {convertNumbersToPersian(
                      moment(specialty.createdAt).format("jYYYY/jMM/jDD")
                    )}
                  </td>
                  <td>
                    {specialty.updatedAt
                      ? convertNumbersToPersian(
                          moment(specialty.updatedAt).format("jYYYY/jMM/jDD")
                        )
                      : "-"}
                  </td>
                  <td>
                    <div className='flex items-center justify-center gap-2'>
                      <label className='toggle text-base-content'>
                        <input
                          type='checkbox'
                          checked={specialty.isActive}
                          onChange={() => changeSpecialtyState(specialty)}
                          disabled={state.loading}
                        />
                        <svg
                          aria-label='disabled'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='4'
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path d='M18 6 6 18' />
                          <path d='m6 6 12 12' />
                        </svg>
                        <svg
                          aria-label='enabled'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'>
                          <g
                            strokeLinejoin='round'
                            strokeLinecap='round'
                            strokeWidth='4'
                            fill='none'
                            stroke='currentColor'>
                            <path d='M20 6 9 17l-5-5'></path>
                          </g>
                        </svg>
                      </label>
                      <div
                        className={`badge badg-soft badge-sm align-bottom ${
                          specialty.isActive ? "badge-success" : "badge-error"
                        }`}>
                        {specialty.isActive ? "فعال" : "غیر فعال"}
                      </div>
                    </div>
                  </td>
                  <td className='text-center'>
                    <div className='flex gap-2 justify-center'>
                      <button
                        className='btn btn-xs btn-info rounded-xl'
                        onClick={() =>
                          dispatch({
                            type: ActionsType.SET_SELECTED,
                            payload: { action: SelectedAction.EDIT, specialty },
                          })
                        }
                        disabled={state.loading}>
                        ویرایش
                      </button>
                      <button
                        className='btn btn-xs btn-error rounded-xl'
                        onClick={() =>
                          dispatch({
                            type: ActionsType.SET_SELECTED,
                            payload: {
                              action: SelectedAction.DELETE,
                              specialty,
                            },
                          })
                        }
                        disabled={state.loading}>
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='flex w-full items-center gap-3'>
        <div>
          <span>تعداد در هر صفحه:</span>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='text-sm btn bg-base-100 border-0'>
              {convertNumbersToPersian(state.limit)}
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content bg-base-300 rounded-box z-10 w-20 p-2 shadow-sm'>
              <li>
                <a
                  className={state.limit === 50 ? "menu-active" : ""}
                  onClick={() => changeLimit(50)}>
                  {convertNumbersToPersian(50)}
                </a>
              </li>
              <li>
                <a
                  className={state.limit === 100 ? "menu-active" : ""}
                  onClick={() => changeLimit(100)}>
                  {convertNumbersToPersian(100)}
                </a>
              </li>
              <li>
                <a
                  className={state.limit === 150 ? "menu-active" : ""}
                  onClick={() => changeLimit(150)}>
                  {convertNumbersToPersian(150)}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            className={`btn btn-ghost rounded-lg ${
              state.page === 1 ? "btn-disabled" : ""
            }`}
            onClick={() => {
              dispatch({
                type: ActionsType.SET_PAGE,
                payload: state.page++,
              });
            }}>
            <FontAwesomeIcon icon={faAngleRight} size='1x' />
          </button>
          <button
            className={`btn btn-ghost rounded-lg ${
              state.page === Math.ceil(total / state.limit)
                ? "btn-disabled"
                : ""
            }`}
            onClick={() => {
              dispatch({
                type: ActionsType.SET_PAGE,
                payload: state.page--,
              });
            }}>
            <FontAwesomeIcon icon={faAngleLeft} size='1x' />
          </button>
        </div>
      </div>
    </>
  );
};

export default SpecialtyList;
