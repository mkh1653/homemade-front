import { serverFetch } from "@/lib/serverApi";
import { Specialty } from "@/lib/schemas/specialty";
import SpecialtyClient from "./SpecialityClient";

async function getSpecialties() {
  const data = await serverFetch<Specialty[]>("/specialty", {
    method: "GET",
  });
  return data;
}

export default async function SpecialitiesPage() {
  const specialties = await getSpecialties();

  return <SpecialtyClient initialSpecialties={specialties} />;
}
