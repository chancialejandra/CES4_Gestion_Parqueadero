import { useState } from "react";
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

function VehicleForm() {
  const { addVehicle } = useVehicle();

  const [vehicleType, setVehicleType] = useState("car");
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("2000");
  const [brand, setBrand] = useState("honda");
  const [cylinder, setCylinder] = useState("0-100");
  const [idDocument, setIdDocument] = useState("");
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };
  const handleIdDocumentChange = (event) => {
    setIdDocument(event.target.value);
  };

  const handleLicensePlateChange = (event) => {
    const value = event.target.value;
    setLicensePlate(value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleCylinderChange = (event) => {
    setCylinder(event.target.value);
  };

  const handleAddVehicle = () => {
    if (
      !licensePlate ||
      !brand ||
      (!cylinder && vehicleType === "moto") ||
      (!model && vehicleType === "car") ||
      !idDocument ||
      !name
    ) {
      toast.warning("Rellena todos los campos");
    } else if (vehicleType == "moto") {
      const motoPlateRegex = /^[A-Z]{3}\d{2}[A-Z]$/;

      if (!motoPlateRegex.test(licensePlate.toUpperCase())) {
        toast.error("Número de placa de moto inválido (AAA12A)");
        return;
      }
    } else if (vehicleType == "car") {
      const carPlateRegex = /^[A-Z]{3}\d{3}$/;
      if (!carPlateRegex.test(licensePlate.toUpperCase())) {
        toast.error("Número de placa de carro inválido (AAA123)");
        return;
      }
    }
    // Agregar el vehículo utilizando la función del contexto
    addVehicle({
      namePropetario: name,
      idDocument: idDocument,
      type: vehicleType,
      licensePlate,
      model,
      brand,
      cylinder: vehicleType === "moto" ? cylinder : undefined,
    });
    setVehicleType("car");
    setLicensePlate("");
    setName("");
    setIdDocument("");
    setModel("2000");
    setBrand("honda");
    setCylinder("0-100");
  };

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 375, height: "auto", boxShadow: "none" }}>
        <CardContent
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" textAlign="center" component="div">
            Registrar vehículo
          </Typography>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="vehicleType">Tipo de vehículo</InputLabel>
            <Select
              label="Tipo de vehículo"
              labelId="vehicleType"
              id="vehicleType"
              value={vehicleType}
              onChange={handleVehicleTypeChange}
            >
              <MenuItem value="car">Carro</MenuItem>
              <MenuItem value="moto">Moto</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              label="Número de placa"
              type="text"
              id="licensePlate"
              value={licensePlate}
              onChange={handleLicensePlateChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              label="Nombre"
              type="text"
              id="nombre"
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              label="Número de documento"
              type="number"
              id="idDocument"
              value={idDocument}
              onChange={handleIdDocumentChange}
            />
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="brand">Marca</InputLabel>
            <Select
              id="brand"
              label="Marca"
              labelId="brand"
              value={brand}
              onChange={handleBrandChange}
            >
              <MenuItem value="victory">Victory</MenuItem>
              <MenuItem value="honda">Honda</MenuItem>
              <MenuItem value="bmw">BMW</MenuItem>
              <MenuItem value="suzuki">suzuki</MenuItem>
              <MenuItem value="ktm">ktm</MenuItem>
            </Select>
          </FormControl>

          {vehicleType === "moto" ? (
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="cylinder">Cilindraje</InputLabel>
              <Select
                label="Cilindraje"
                labelId="cylinder"
                id="cylinder"
                value={cylinder}
                onChange={handleCylinderChange}
              >
                <MenuItem value="0-100">0-100</MenuItem>
                <MenuItem value="101-200">101-200</MenuItem>
                <MenuItem value="201-300">201-300</MenuItem>
                <MenuItem value="301-400">301-400</MenuItem>
                <MenuItem value="+401">+401</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="model">Modelo</InputLabel>
              <Select
                id="model"
                label="Modelo"
                labelId="model"
                value={model}
                onChange={handleModelChange}
              >
                <MenuItem value="2000">2000</MenuItem>
                <MenuItem value="2001">2001</MenuItem>
                <MenuItem value="2002">2002</MenuItem>
                <MenuItem value="2003">2003</MenuItem>
                <MenuItem value="2004">2004</MenuItem>
                <MenuItem value="2005">2005</MenuItem>
                <MenuItem value="2006">2006</MenuItem>
                <MenuItem value="2007">2007</MenuItem>
                <MenuItem value="2008">2008</MenuItem>
                <MenuItem value="2009">2009</MenuItem>
                <MenuItem value="2010">2010</MenuItem>
                <MenuItem value="2011">2011</MenuItem>
                <MenuItem value="2012">2012</MenuItem>
                <MenuItem value="2013">2013</MenuItem>
                <MenuItem value="2014">2014</MenuItem>
                <MenuItem value="2015">2015</MenuItem>
                <MenuItem value="2016">2016</MenuItem>
                <MenuItem value="2017">2017</MenuItem>
                <MenuItem value="2018">2018</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl>
          )}
          <Button variant="text" onClick={handleAddVehicle}>
            Registrar Vehículo
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default VehicleForm;
