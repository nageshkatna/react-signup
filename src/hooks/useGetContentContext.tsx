import { useContext } from "react";
import { GetContentContext } from "../context/GetContentContext";

export const useGetContentContext = () => {
  const context = useContext(GetContentContext);

  if (!context) {
    throw Error("useGetContentContext must be used inside an GetContentContextProvider");
  }

  return context;
};
