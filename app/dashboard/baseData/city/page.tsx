"use server";
import { City } from "@/lib/schemas/city";
import CityWrapper from "./CityWrapper";
import { serverFetch } from "@/lib/serverApi";
import { cookies } from "next/headers";

export async function getCities(): Promise<City[] | undefined> {
  const response = await serverFetch<City[]>("/city", {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  if (response) return response;
}

export default async function Cityage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    const cities = await getCities();
    return <CityWrapper initialCities={cities} />;
  }
}
