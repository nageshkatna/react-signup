import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { PrivateRouteProps } from "../types/PrivateRoute.types";

const PrivateRoutes = ({ children }: PrivateRouteProps) => {
  const { isVerified } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [isVerified, location, navigate]);

  return <div>{isVerified ? children : <p>Loading...</p>}</div>;
};

export default PrivateRoutes;
