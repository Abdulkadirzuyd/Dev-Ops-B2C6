import { NavLink } from 'react-router-dom';
import styles from './NavbarStyle.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🍌 ERP Systeem</div>
      <div className={styles.links}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? styles.active : undefined} 
          end
        >
          Home
        </NavLink>
        <NavLink 
          to="/login" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Login
        </NavLink>
        <NavLink 
          to="/register" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Registreer
        </NavLink>
        <NavLink 
          to="/purchasing" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Inkoop
        </NavLink>
        <NavLink 
          to="/storage" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Voorraad
        </NavLink>
        <NavLink 
          to="/order" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Orders
        </NavLink>
      </div>
    </nav>
  );
}
