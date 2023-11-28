/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// ParkingContext.js
import { createContext, useState, useContext, useCallback } from "react";

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [occupiedSpaces, setOccupiedSpaces] = useState([]);
  const [listaCarros, setListaCarros] = useState([]);

  const initializeParkingSpaces = useCallback(
    (carSpaces, motoSpaces) => {
      // Inicializa las celdas del parqueadero para carros y motos
      const carSpacesArray = Array(carSpaces)
        .fill(null)
        .map((_, index) => ({
          type: "car",
          number: index + 1,
          occupied: false,
        }));
      const motoSpacesArray = Array(motoSpaces)
        .fill(null)
        .map((_, index) => ({
          type: "moto",
          number: index + 6,
          occupied: false,
        }));

      const updatedParkingSpaces = [...carSpacesArray, ...motoSpacesArray];

      // Elimina los espacios que están en la lista occupiedSpaces
      const filteredSpaces = updatedParkingSpaces.filter(
        (space) => !occupiedSpaces.includes(space.number)
      );

      setParkingSpaces(filteredSpaces);

      const availableSpaces = filteredSpaces.map((space) => space.number);
      return availableSpaces;
    },
    [occupiedSpaces]
  );

  const getParkingSpaces = () => {
    // Obtiene la información de todas las celdas del parqueadero
    return parkingSpaces;
  };

  const getOccupiedSpaces = () => {
    // Obtiene la información de las celdas ocupadas
    return occupiedSpaces;
  };

  const parkVehicle = (spaceNumber, selectedVehicle, type) => {
    // Estaciona un vehículo en la celda especificada
    // Actualiza los estados según sea necesario

    const updatedSpaces = parkingSpaces.map((space) => {
      if (space.number === spaceNumber) {
        const formattedEntryTime = new Intl.DateTimeFormat("es", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date());

        return {
          ...space,
          occupied: true,
          vehicle: {
            licensePlate: selectedVehicle,
            entryTime: formattedEntryTime, // Agrega la fecha y hora de entrada
          },
        };
      }
      return space;
    });

    const changedSpace = updatedSpaces.find(
      (space) => space.number === spaceNumber
    );

    // Actualiza listaCarros solo con el registro que cambió
    if (changedSpace) {
      setListaCarros((prevListaCarros) => [...prevListaCarros, changedSpace]);
    }

    // setListaCarros(updatedSpaces);
    setOccupiedSpaces([...occupiedSpaces, spaceNumber]);
    setParkingSpaces(updatedSpaces);
  };

  const leaveParkingSpace = (spaceNumber) => {
    // Libera la celda del parqueadero ocupada por un vehículo
    // Actualiza los estados según sea necesario
    const updatedSpaces = parkingSpaces.map((space) => {
      if (space.number === spaceNumber) {
        return { ...space, occupied: false };
      }
      return space;
    });

    setParkingSpaces(updatedSpaces);
    setOccupiedSpaces(occupiedSpaces.filter((space) => space !== spaceNumber));
    setListaCarros(
      listaCarros.filter((car) => car.number !== spaceNumber)
    );
  };

  const getVehicleByLicensePlate = (licensePlate, vehicles, selectedSpace) => {
    // Obtener la información de un vehículo por su placa
    const space = vehicles.find((space) => space.licensePlate === licensePlate);
    if (space) {
      return { ...space };
    }
    return null; // Si no se encuentra el vehículo
  };

  const getVehicleAll = () => {
    return listaCarros;
  };

  return (
    <ParkingContext.Provider
      value={{
        initializeParkingSpaces,
        getParkingSpaces,
        getOccupiedSpaces,
        parkVehicle,
        leaveParkingSpace,
        getVehicleByLicensePlate,
        getVehicleAll,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error(
      "useParking debe ser utilizado dentro de un ParkingProvider"
    );
  }
  return context;
};
