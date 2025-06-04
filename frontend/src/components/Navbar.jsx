import { NavLink } from "react-router-dom";
import './Navbar.css';
import logo from '../assets/banaanlogo.png';

function Navbar() {
  return (
    <nav className="navbar">
       <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <NavLink to="/home" end>Home</NavLink>
      <NavLink to="/customerSimulation">Customer</NavLink>
      <NavLink to="/order">Orders</NavLink>
      <NavLink to="/storage">Storage</NavLink>
      <NavLink to="/sales">Sales</NavLink>
    </nav>
  );
}

export default Navbar;
