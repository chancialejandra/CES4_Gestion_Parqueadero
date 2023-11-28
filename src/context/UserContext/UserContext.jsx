/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// UserContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Puedes inicializarlo con un usuario por defecto si es necesario

  const userQuemado = "aleja@gmail.com";
  const passwordQuemado = "aleja1234";

  // Aquí podrías realizar operaciones de autenticación, si es necesario
  useEffect(() => {
    // Tu lógica de autenticación aquí (por ejemplo, verificar si el usuario está autenticado)
  }, []);

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
