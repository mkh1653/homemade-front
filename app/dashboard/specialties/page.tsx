"use server";
import { serverFetch } from "@/src/lib/serverApi";
import { Specialty } from "@/src/lib/schemas/specialty";
import SpecialityWrapper from "./SpecialtyWrapper";
import { cookies } from "next/headers";

export interface SpecialtyResponse {
  page: number;
  limit: number;
  total: number;
  data: Specialty[];
}

type GetSpecialtiesParams = {
  filter?: any;
  search?: string;
  limit?: number;
  page?: number;
};

export async function getSpecialties(): Promise<SpecialtyResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const url = "/specialty";

  const data = await serverFetch<SpecialtyResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data) return null;
  return data;
}

export default async function SpecialitiesPage() {
  const specialtyRes = await getSpecialties();

  return <SpecialityWrapper initialSpecialtiesRes={specialtyRes} />;
}
