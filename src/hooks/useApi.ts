import { toast } from "react-hot-toast";
import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface ApiMutate {
  url: string;
  method?: HttpMethod;
  data?: unknown;
  notify?: boolean;
  [key: string]: unknown;
}

interface ApiQuery {
  url: string;
  method?: "get" | "delete";
  notify?: boolean;
}

export const useApiMutate = ({
  url,
  method = "post",
  data = null,
  notify = false,
  ...options
}: ApiMutate) => {
  const mutate = useMutation({
    mutationFn: async (values: unknown = data) =>
      (await axiosInstance.request({ url, method, data: values })).data,

    mutationKey: [url, method],
    ...options,
  });

  if (mutate.isError && notify && axios.isAxiosError(mutate.error)) {
    const message =
      mutate.error.response?.data.error?.message || mutate.error?.message;
    toast.error(message);
  }

  return mutate;
};

const apiQuery = async ({
  url = "",
  method = "get",
  notify = false,
}: ApiQuery) => {
  try {
    const response = (await axiosInstance[method](url)).data;
    return response;
  } catch (error) {
    console.error("Error:", error);
    if (notify) {
      toast.error("Something went wrong!");
    }
    return error;
  }
};

export const useApiQuery = ({
  url = "",
  method = "get",
  notify = false,
}: ApiQuery) => {
  const query = useQuery({
    queryFn: async () => apiQuery({ url, method, notify }),
    queryKey: [url, method],
  });
  return query;
};
