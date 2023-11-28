import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { UserProvider } from "./context/UserContext/UserContext";
import { VehicleProvider } from "./context/VehicleContext/VehicleContext";
import { ParkingProvider } from "./context/ParkingContext/ParkingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <ToastContainer autoClose={2000} position="top-center" />
        <UserProvider>
          <VehicleProvider>
            <ParkingProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </ParkingProvider>
          </VehicleProvider>
        </UserProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;
