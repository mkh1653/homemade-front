import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getAllSupporters,
  getSupporterById,
} from "@/src/services/supporterService";

export const useSupporterList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const limit = Number(searchParams.get("limit")) || 50;
  const filter = searchParams.get("filter") || "";

  const queryKey = ["supporters", { page, search, limit, filter }];

  return useQuery({
    queryKey,
    queryFn: () => getAllSupporters({ page, search, limit, filter }),
  });
};

export const useSupporterDetail = (id: string) => {
  return useQuery({
    queryKey: ["supporters", id],
    queryFn: () => getSupporterById(id),
    enabled: !!id,
  });
};
