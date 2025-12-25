"use server";
import { City } from "@/src/lib/schemas/city";
import CityWrapper from "./CityWrapper";
import { serverFetch } from "@/src/lib/serverApi";
import { cookies } from "next/headers";

export async function getCities(): Promise<City[] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const response = await serverFetch<City[]>("/city", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) {
    return null;
  }
  return response;
}

export default async function Cityage() {
  const cities = await getCities();
  return <CityWrapper initialCities={cities} />;
}
