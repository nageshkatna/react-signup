import ApiService from "./ApiService";
import { DeleteUserT, FetchUserResponseT, Options, UpdateUserT, UserT } from "../types/index.types";
import { QueryKey } from "@tanstack/react-query";
import Cookies from "js-cookie";

const GetContentService = {
  viewAllUsers: async (page: number) => {
    const token = Cookies.get("jwt");
    if (token === undefined) {
      return false;
    }

    const options: Options = {
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/view/?page=${page}`,
      method: "GET",
      header: { Authorization: `Bearer ${token}` },
    };

    const response = await ApiService.fetchApi<FetchUserResponseT>({ ...options });

    return response;
  },
  updateUser: async (updateUser: UpdateUserT) => {
    const token = Cookies.get("jwt");
    if (token === undefined) {
      return { error: "No token present" };
    }

    const options: Options = {
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/updateUser/`,
      method: "PUT",
      header: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...updateUser,
      }),
    };

    const response = await ApiService.fetchApi<DeleteUserT>({ ...options });

    return response;
  },
  deleteUser: async (user_id: string) => {
    const token = Cookies.get("jwt");
    if (token === undefined) {
      return { error: "No token present" };
    }

    const options: Options = {
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/deleteUser/`,
      method: "DELETE",
      header: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        user_id,
      }),
    };

    const response = await ApiService.fetchApi<DeleteUserT>({ ...options });

    return response;
  },
};

export const getContentKeys = {
  view: (page: number): QueryKey => ["view", page],
  delete: (user_id: string): QueryKey => ["delete", user_id],
};

export default GetContentService;
