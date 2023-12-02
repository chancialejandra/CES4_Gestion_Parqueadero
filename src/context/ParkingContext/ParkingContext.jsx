import { createContext, useState, useContext, useCallback } from "react";

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [occupiedSpaces, setOccupiedSpaces] = useState([]);
  const [listaCarros, setListaCarros] = useState([]);

  const initializeParkingSpaces = useCallback(
    (carSpaces, motoSpaces) => {
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
    return parkingSpaces;
  };

  const getOccupiedSpaces = () => {
    return occupiedSpaces;
  };

  const parkVehicle = (spaceNumber, selectedVehicle, type) => {
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
            entryTime: formattedEntryTime, 
          },
        };
      }
      return space;
    });

    const changedSpace = updatedSpaces.find(
      (space) => space.number === spaceNumber
    );

    if (changedSpace) {
      setListaCarros((prevListaCarros) => [...prevListaCarros, changedSpace]);
    }

    setOccupiedSpaces([...occupiedSpaces, spaceNumber]);
    setParkingSpaces(updatedSpaces);
  };

  const leaveParkingSpace = (spaceNumber) => {
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
    const space = vehicles.find((space) => space.licensePlate === licensePlate);
    if (space) {
      return { ...space };
    }
    return null; 
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
