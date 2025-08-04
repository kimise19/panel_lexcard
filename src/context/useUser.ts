import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un proveedor de usuarios");
  }
  return context;
};
