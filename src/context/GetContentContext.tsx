import { createContext, useState, useEffect } from "react";
import { ContextType, GetContentContextT, UserT } from "../types/index.types";
import GetContentService, { getContentKeys } from "../services/GetContent.service";
import { useQuery } from "@tanstack/react-query";

export const GetContentContext = createContext({} as GetContentContextT);

export const GetContentContextProvider = ({ children }: ContextType) => {
  const [users, setUsers] = useState<UserT[]>([
    {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  ]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  const {
    data,
    isLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryKey: getContentKeys.view(page),
    queryFn: () => GetContentService.viewAllUsers(page + 1),
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      setUsers(data.results);
      setTotalCount(data.count);
    }
  });

  return (
    <div>
      {isLoading ? (
        "Loading...."
      ) : (
        <GetContentContext.Provider
          value={{
            users,
            setUsers,
            page,
            setPage,
            rowsPerPage,
            setRowsPerPage,
            totalCount,
            setTotalCount,
            refetchAllUsers,
          }}
        >
          {children}
        </GetContentContext.Provider>
      )}
    </div>
  );
};
