export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ISignUp extends User {
  password: string;
}

export interface IRegisterValidation {
  [key: string]: string;
}
