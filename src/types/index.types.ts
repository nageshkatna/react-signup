import { IFormData, AuthResultT, TokenT } from "./login.types";
import { Options } from "./services.types";
import { PrivateRouteProps } from "./PrivateRoute.types";
import { AuthContextT, GetContentContextT } from "./context.types";
import { ISignUp, IRegisterValidation } from "./register.types";
import { UserT, FetchUserResponseT, DeleteUserT, UpdateUserT } from "./dashboard.types";

export type { IFormData, AuthResultT, TokenT };
export type { Options };
export type { PrivateRouteProps };
export type { AuthContextT };
export type { ISignUp, IRegisterValidation };
export type { UserT, FetchUserResponseT, DeleteUserT, UpdateUserT };
export type { GetContentContextT };

export type ContextType = {
  children: React.ReactNode;
};
