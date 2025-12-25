import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSupporter,
  updateSupporter,
} from "@/src/services/supporterService";

export const useSupporterMutation = (type: "create" | "update") => {
  const queryClient = useQueryClient();
  // useContext

  const mutationFunction = (param: any) => {
    if (type === "create") return createSupporter(param.data);
    if (type === "update") return updateSupporter(param.id, param.data);
    throw new Error("Invalid mutation type");
  };

  return useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supporter"] });
      //   loading false
      //   close modal
    },
    onError: () => {
      //   loading false
      //    show error
    },
  });
};
