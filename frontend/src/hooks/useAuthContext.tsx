import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context: any= useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be used inside a AuthContextProvider");
  }
  return context;
};