export interface IFormData {
  email: string;
  password: string;
}

export type AuthResultT = {
  tokens?: TokenT;
  userId?: string;
  message?: string;
};

export type TokenT = {
  refresh: string;
  access: string;
  non_field_errors?: string;
};
