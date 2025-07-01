import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Navbar from "./components/Navbar";
import StoragePage from "./pages/Storage/StoragePage";
import StartupPage from "./pages/Startup/StartupPage";
import HomePage from "./pages/Home/HomePage";
import SalesPage from "./pages/Sales/SalesPage";
import OrderPage from "./pages/Order/OrderControl";
import CustomerSimulationPage from "./pages/CustomerSimulation/CustomerSimulationPage";
import PlanningPage from "./pages/Planning/PlanningPage";
import ProductionPage from "./pages/Production/ProductionPage";

function AppContent() {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/register"];
  const hideNavbar = hiddenRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? "centered-page" : "main-content"}>
        <Routes>
          <Route path="/" element={<StartupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/customerSimulation" element={<CustomerSimulationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/storage" element={<StoragePage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/production" element={<ProductionPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
