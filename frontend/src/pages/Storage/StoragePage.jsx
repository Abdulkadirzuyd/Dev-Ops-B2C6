import React from "react";
import styles from "./StorageStyle.module.css";


const StoragePage = () => {
  return (
    <div className={styles.storageContainer}>

      <div className="content">
        <div className="topbar">
          <h1 className="title">Voorraadbeheer</h1>
          <input className="small-input" />
          <input className="small-input" />
        </div>

        <div className="controls">
            <button className={styles.button}>Zoeken</button>
            <div className="color-box"></div>
            <button className={styles.button}>Sorteren</button>
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
