export type FetchUserResponseT = {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserT[];
};

export type UserT = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type DeleteUserT = {
  message?: string;
  error?: string;
};

export type UpdateUserT = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
};
