import React from "react";
import styles from "./StorageStyle.module.css";
import Sidebar from "../SideBar/SideBar";

const StoragePage = () => {
  return (
    <div className={styles.storageContainer}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className="content">
        <div className="topbar">
          <button className="circle-btn">🔍</button>
          <div className="title">Voorraadbeheer</div>
          <input className="small-input" />
          <input className="small-input" />
        </div>

        <div className="controls">
          <button>Zoeken</button>
          <div className="color-box"></div>
          <button>Sorteren</button>
        </div>

        <div className="table">
          <div className="table-header">
            <div>Productnr</div>
            <div>Productnaam</div>
            <div>Voorraad</div>
            <div>Besteld</div>
            <div>Gereserveerd</div>
          </div>
          {[...Array(13)].map((_, i) => (
            <div className="table-row" key={i}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
