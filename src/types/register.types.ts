export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ISignUp extends User {
  password: string;
}

export interface IRegisterValidation {
  [key: string]: string;
}
