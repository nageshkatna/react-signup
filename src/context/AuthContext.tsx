import { createContext, useState, useEffect } from "react";
import { AuthContextT, ContextType } from "../types/index.types";
import AuthenticationService from "../services/Authentication.service";

export const AuthContext = createContext({} as AuthContextT);

export const AuthContextProvider = ({ children }: ContextType) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (isVerified) {
      setIsLoading(false);
      return;
    }
    const response = AuthenticationService.verify();
    response
      .then((res) => {
        setIsVerified(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error("Error in verifying the user: " + err);
      });
  }, [isVerified]);

  const verifyUser = () => {
    setIsVerified(true);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <AuthContext.Provider value={{ isVerified, verifyUser }}>{children}</AuthContext.Provider>
      )}
    </div>
  );
};
