import { Button, Grid, Typography } from "@mui/material";
import ParkingForm from "../../components/ParkingForm/ParkingForm";
import ParkingLot from "../../components/ParkingLot/ParkingLot";
import VehicleForm from "../../components/VehicleForm/VehicleForm";
import { useUser } from "../../context/UserContext/UserContext";
import style from "../../pages/DashboardPage/DashboardPage.module.css";

function DashboardPage() {
  const { logout } = useUser();

  const handleCerrarSesion = () => {
    logout();
  };
  return (
    <Grid>
    <Grid container direction="row" padding={1} spacing={2}>
      <Grid item xs={12}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Typography variant="h4" textAlign="center" component="div">
          Parqueadrero
        </Typography>
        <Button variant="text" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </Button>
      </Grid>
    </Grid> 
    <Grid section className={style.appwrapperCabeza} >
          <ParkingForm />
    </Grid >

    <Grid div className={style.prueba}>
      <Grid div >
        <Grid section className={style.appwrapper} >
          <VehicleForm />
        </Grid >   
      </Grid >
      <Grid section className={style.appwrapper}>
          <ParkingLot />
      </Grid>
    </Grid>
  </Grid>
   
    
  

  
  

      
   
    
  );
}

export default DashboardPage;
