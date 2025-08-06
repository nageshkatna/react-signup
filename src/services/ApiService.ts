import { QueryClient } from "@tanstack/react-query";
import { Options } from "../types/index.types";

const ApiService = {
  fetchApi: async <T = unknown>(options: Options): Promise<T> => {
    const { method, body, url, header } = options;
    const headers: HeadersInit = {
      ...header,
      "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
      mode: import.meta.env.VITE_APP_NODE_ENV === "production" ? "same-origin" : "cors",
      credentials: "same-origin",
      cache: "no-cache",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    };

    const response = await fetch(url, requestOptions)
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("Error while making a fetch: " + res.statusText);
        }
        return res.json();
      })
      .catch((err: Error) => {
        throw err;
      });

    return response;
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default ApiService;
