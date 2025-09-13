"use server";
import { Province } from "@/lib/schemas/province";
import ProvinceWrapper from "./ProvinceWrapper";
import { serverFetch } from "@/lib/serverApi";
import { cookies } from "next/headers";

export async function getProvinces(): Promise<Province[] | undefined> {
  const response = await serverFetch<Province[]>("/province", {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  if (response) return response;
}

export default async function ProvincePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    const provinces = await getProvinces();
    return <ProvinceWrapper initialProvices={provinces} />;
  }
}
