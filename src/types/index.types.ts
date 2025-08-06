import { IFormData, IAuthResult } from "./login.types";
import { Options } from "./services.types";
import { PrivateRouteProps } from "./PrivateRoute.types";
import { AuthContextT } from "./context.types";
import { ISignUp, IRegisterValidation } from "./register.types";

export type { IFormData, IAuthResult };
export type { Options };
export type { PrivateRouteProps };
export type { AuthContextT };
export type { ISignUp, IRegisterValidation };

export type ContextType = {
  children: React.ReactNode;
};
