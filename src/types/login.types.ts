export interface IFormData {
  email: string;
  password: string;
}

export type IAuthResult = {
  token?: string;
  userId?: string;
  message?: string;
};
