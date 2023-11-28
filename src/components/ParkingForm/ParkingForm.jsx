import { useState, useEffect } from "react";
import { useParking } from "../../context/ParkingContext/ParkingContext";
import { useVehicle } from "../../context/VehicleContext/VehicleContext";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function ParkingForm() {
  const {
    parkVehicle,
    getOccupiedSpaces,
    initializeParkingSpaces,
    getVehicleByLicensePlate,
    getParkingSpaces,
    getVehicleAll,
  } = useParking();
  const { getVehicles } = useVehicle();

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [typeSelected, setTypeSelected] = useState("");
  const [buscar, setBuscar] = useState("");
  const [parkingSpacesList, setParkingSpacesList] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const vehiclesAll = getVehicleAll();
  const vehicles = getVehicles();
  const occupiedSpaces = getOccupiedSpaces();
  const parkingSpaces = getParkingSpaces();

  useEffect(() => {
    const updatedSpacesList = initializeParkingSpaces(10, 10);
    setParkingSpacesList(updatedSpacesList);
  }, [initializeParkingSpaces]);

  const handleVehicleChange = (event) => {
    const value = event.target.value;
    const type = vehicles.find((e) => e.licensePlate == value);
    setTypeSelected(type.type);
    setSelectedVehicle(value);
  };

  const handleSpaceChange = (event) => {
    const selectedSpaceValue = event.target.value;
    if (occupiedSpaces.includes(selectedSpaceValue)) {
      toast.warning("Esta celda está ocupada. Selecciona otra celda.");
    } else {
      setSelectedSpace(selectedSpaceValue);
    }
  };

  const handleBuscar = (event) => {
    const buscado = event.target.value;
    setBuscar(buscado);
    const filteredVehicleOptions = vehicles
      .filter(
        (vehicle) =>
          vehicle.licensePlate.toLowerCase().includes(buscado.toLowerCase()) ||
          vehicle.idDocument.toLowerCase().includes(buscado.toLowerCase())
      )
      .map((vehicle) => vehicle.licensePlate);

    // Actualiza las opciones de vehículos según la búsqueda
    setSelectedVehicle("");
    setVehicleOptions(filteredVehicleOptions);
  };

  const handleParkVehicle = () => {
    // Realiza las validaciones necesarias antes de registrar el ingreso al parqueadero
    if (!selectedVehicle || !selectedSpace) {
      toast.warning("Selecciona un vehículo y una celda");
      return;
    }
    // Lógica para registrar el ingreso al parqueadero
    const spaceNumber = parseInt(selectedSpace, 10);

    // El vigilante ha ingresado un número de placa
    const vehicleInfo = getVehicleByLicensePlate(
      selectedVehicle,
      vehicles,
      spaceNumber
    );

    const validarsiYaExiste = vehiclesAll.map((i) => i.vehicle.licensePlate);

    if (vehicleInfo && validarsiYaExiste.includes(selectedVehicle) != true) {
      parkVehicle(spaceNumber, selectedVehicle, vehicleInfo.type);
      toast.success("Vehiculo registrado en celda.");
      // Eliminar la celda ocupada de parkingSpacesList
      const updatedSpacesList = parkingSpacesList.filter(
        (space) => space !== spaceNumber
      );
      setParkingSpacesList(updatedSpacesList);

      // Limpiar los campos después de registrar el ingreso
      setSelectedVehicle("");
      setSelectedSpace("");
    } else {
      toast.error("Este vehiculo ya esta registrado en una celda");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 375, height: "auto", boxShadow: "none" }}>
        <CardContent
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" textAlign="center" component="div">
            Registrar ingreso al parqueadero
          </Typography>

          <FormControl fullWidth>
            <TextField
              variant="standard"
              label="Buscar por placa o número de documento"
              id="Buscar"
              type="text"
              value={buscar}
              onChange={handleBuscar}
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="vehicle">Selecciona un vehículo</InputLabel>
            <Select
              labelId="vehicle"
              id="vehicle"
              value={selectedVehicle}
              onChange={handleVehicleChange}
              label="Selecciona un vehículo"
            >
              <MenuItem value="" disabled>
                Selecciona un vehículo
              </MenuItem>
              {vehicleOptions.map((vehicle, index) => (
                <MenuItem key={index} value={vehicle}>
                  {vehicle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="space">Selecciona una celda</InputLabel>
            <Select
              id="space"
              labelId="space"
              value={selectedSpace}
              onChange={handleSpaceChange}
              label="Selecciona una celda"
            >
              <MenuItem value="" disabled>
                Selecciona una celda
              </MenuItem>
              {parkingSpaces.map((space, index) => {
                if (!space.occupied) {
                  // Verificar el tipo de vehículo seleccionado
                  if (typeSelected === "moto" && space.type === "moto") {
                    return (
                      <MenuItem key={index} value={space.number}>
                        {`Moto - Celda ${space.number}`}
                      </MenuItem>
                    );
                  } else if (typeSelected === "car" && space.type === "car") {
                    return (
                      <MenuItem key={index} value={space.number}>
                        {`Carro - Celda ${space.number}`}
                      </MenuItem>
                    );
                  }
                }
                return null; // No mostrar celdas ocupadas
              })}
            </Select>
          </FormControl>
          <Button variant="text" onClick={handleParkVehicle}>
            Registrar Ingreso
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ParkingForm;
