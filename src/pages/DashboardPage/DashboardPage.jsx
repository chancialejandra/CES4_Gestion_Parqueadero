import { Button, Grid, Typography } from "@mui/material";
import ParkingForm from "../../components/ParkingForm/ParkingForm";
import ParkingLot from "../../components/ParkingLot/ParkingLot";
import VehicleForm from "../../components/VehicleForm/VehicleForm";
import { useUser } from "../../context/UserContext/UserContext";

function DashboardPage() {
  const { logout } = useUser();

  const handleCerrarSesion = () => {
    logout();
  };
  return (
    <Grid container direction="row" padding={1} spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Typography variant="h4" textAlign="center" component="div">
          Inicio
        </Typography>
        <Button variant="text" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </Button>
      </Grid>

      <Grid item container justifyContent="center" alignItems="center" xs={12}>
        <Grid item xs={6}>
          <VehicleForm />
        </Grid>

        <Grid item xs={6}>
          <ParkingForm />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ParkingLot />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
