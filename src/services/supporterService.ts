import { serverFetch } from "@/src/lib/serverApi";
import { Supporter } from "../lib/schemas/supporter";

// Create
export const createSupporter = async (data: object) => {
  return serverFetch(`/supporter`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Edit
export const updateSupporter = async (id: string, data: object) => {
  return serverFetch(`/supporter/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

// Get all
export const getAllSupporters = async (params: any) => {
  const response = await serverFetch<Supporter[]>(
    `/supporter?${new URLSearchParams(params).toString()}`,
    {
      method: "GET",
    }
  );
  return response;
};

// Get by id
export const getSupporterById = async (id: string) => {
  const response = await serverFetch(`/supporter/${id}`, {
    method: "GET",
  });
  return response;
};
