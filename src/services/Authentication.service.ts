import ApiService from "./ApiService";
import { IFormData, IAuthResult, Options, ISignUp } from "../types/index.types";
import { QueryKey } from "@tanstack/react-query";
import Cookies from "js-cookie";

const AuthenticationService = {
  authenticate: async (body: IFormData) => {
    const options: Options = {
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/user/authentication`,
      method: "POST",
      body: JSON.stringify({ ...body }),
    };

    const response = await ApiService.fetchApi<IAuthResult>({ ...options });

    return response;
  },
  register: async (body: ISignUp) => {
    const options: Options = {
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/user/register`,
      method: "POST",
      body: JSON.stringify({ ...body }),
    };

    const response = await ApiService.fetchApi<IAuthResult>({ ...options });

    return response;
  },
  verify: async () => {
    const token = Cookies.get("jwt");
    if (token === undefined) {
      return false;
    }
    const options: Options = {
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/api/verify`,
      method: "GET",
      header: { token },
    };

    const response = await ApiService.fetchApi<boolean>({ ...options });
    return response;
  },
};

export default AuthenticationService;

export const authKeys = {
  authenticate: (): QueryKey => ["authenticate"],
};
