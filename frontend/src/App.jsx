import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Navbar from "./components/Navbar";
import Purchasing from "./pages/Purchasing/Purchasing";
import StoragePage from "./pages/Storage/StoragePage";
import StartupPage from "./pages/Startup/StartupPage";
import HomePage from "./pages/Home/HomePage";

function AppContent() {
  const location = useLocation();

  // Verberg Navbar op deze routes
  const hiddenRoutes = ["/", "/login", "/register"];
  const hideNavbar = hiddenRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? "centered-page" : "main-content"}>
        <Routes>
          <Route path="/" element={<StartupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/purchasing" element={<Purchasing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/storage" element={<StoragePage />} />
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
