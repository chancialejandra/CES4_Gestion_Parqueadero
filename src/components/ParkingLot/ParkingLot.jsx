import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useParking } from "../../context/ParkingContext/ParkingContext";

function ParkingLot() {
  const { getParkingSpaces, getVehicleAll, leaveParkingSpace } = useParking();

  const parkingSpaces = getParkingSpaces();
  const vehicles = getVehicleAll();

  const handleElimiarCelda = (e) => {
    const space = e;
    leaveParkingSpace(space);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      spacing={2}
      padding={2}
    >
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" component="div">
          Estado del parqueadero
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 50 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={2}>
                  Celdas disponibles
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">Tipo</StyledTableCell>
                <StyledTableCell align="center">Celda</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {parkingSpaces.map(
                (space, index) =>
                  !space.occupied && (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {`${space.type === "car" ? "Carro" : "Moto"} `}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {`Celda ${space.number}`}
                      </StyledTableCell>
                    </StyledTableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={8}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={5}>
                  Celdas ocupadas
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">Tipo</StyledTableCell>
                <StyledTableCell align="center">Celda</StyledTableCell>
                <StyledTableCell align="center">Placa</StyledTableCell>
                <StyledTableCell align="center">Hora ingreso</StyledTableCell>
                <StyledTableCell align="center">Salida</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((space, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {`${space.type === "car" ? "Carro" : "Moto"}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">{`Celda ${space.number} - Ocupada`}</StyledTableCell>
                  <StyledTableCell align="center">{`${space.vehicle.licensePlate}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${space.vehicle.entryTime}`}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="text"
                      onClick={() => handleElimiarCelda(space.number)}
                    >
                      Dar salida
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default ParkingLot;
