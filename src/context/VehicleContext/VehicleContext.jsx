/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// VehicleContext.js
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const addVehicle = (vehicle) => {
    // Verificar si la placa o el documento ya existen
    const existingVehicle = vehicles.find(
      (v) =>
        v.licensePlate === vehicle.licensePlate ||
        v.idDocument === vehicle.idDocument
    );

    if (existingVehicle) {
      toast.error("Ya existe un vehículo con la misma placa o documento.");
      return;
    } else {
        toast.success("Vehiculo registrado");
      setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
    }
  };

  const getVehicles = () => {
    // Puedes implementar lógica para obtener la lista de vehículos
    return vehicles;
  };

  return (
    <VehicleContext.Provider value={{ addVehicle, getVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error(
      "useVehicle debe ser utilizado dentro de un VehicleProvider"
    );
  }
  return context;
};
