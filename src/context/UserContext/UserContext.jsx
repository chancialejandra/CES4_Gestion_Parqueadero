import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const userQuemado = "alejandra@gmail.com";
  const passwordQuemado = "aleja1234";

  useEffect(() => {}, []);

  const login = (username, password) => {
    if (userQuemado == username && passwordQuemado == password) {
      window.location.href = "/#/dashboard";
      toast.success("Inicio de sesión exito!!");
    } else {
      toast.warning("Correo o contraseña incorrectas");
    }
  };

  const logout = () => {
    window.location.href = "/#/";
    toast.success("Se cerro correctamente la sesión");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};
