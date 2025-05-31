import React from "react";
import styles from "./SidebarStyle.module.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Sidebar}>
      <h3>Menu</h3>
      <button onClick={() => navigate("/storage")}>Voorraad</button>
      <button>Inkoop</button>
      <button>Verkoop</button>
      <button>Financiën</button>
      <button>HR</button>
    </div>
  );
};

export default Sidebar;
