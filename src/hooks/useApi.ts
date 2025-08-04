import axiosInstance from "@/api/axiosInstance";
import * as query from "@tanstack/react-query";
import toast from "react-hot-toast";

type Methods = "get" | "post" | "patch" | "put" | "delete";

const useMutate = (
  url: string = "",
  method: Methods = "get",
  data: any = {},
  notify: boolean = true
) => {
  const mutate = query.useMutation({
    mutationFn: async (values: any = data) =>
      (await axiosInstance[method](url, values)).data,
    mutationKey: [url, method],
  });

  if (mutate.isError && notify) {
    const msg = mutate.error?.message || "Something went wrong.";
    toast.error(msg);
  }

  if (mutate.isSuccess && notify) {
    const msg = mutate.data?.data?.message || "Success";
    toast.success(msg);
  }
  return mutate;
};

const useQuery = (url: string, method: "get" | "delete" = "get") => {
  const response = query.useQuery({
    queryFn: async () => (await axiosInstance[method](url)).data,
    queryKey: [url, method],
  });
  return response;
};

export { useMutate, useQuery };
