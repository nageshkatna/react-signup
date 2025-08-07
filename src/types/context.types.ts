import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FetchUserResponseT, UserT } from "./dashboard.types";

export type AuthContextT = {
  isVerified: boolean;
  verifyUser: () => void;
};

export type GetContentContextT = {
  users: UserT[];
  setUsers: (users: UserT[]) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (page: number) => void;
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  refetchAllUsers: (options?: RefetchOptions) => Promise<QueryObserverResult<false | FetchUserResponseT, Error>>;
};
