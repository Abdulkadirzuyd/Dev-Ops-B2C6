import React, { useState } from "react";
import styles from "./ProductionStyle.module.css";

import A_bovenprofiel from "../../assets/A-bovenprofiel.png";
import A_zijkant from "../../assets/A-zijprofiel.png";
import A_intern from "../../assets/A-Model.png";

import B_bovenprofiel from "../../assets/B-bovenprofiel.png";
import B_zijkant from "../../assets/B-zijprofiel.png";
import B_intern from "../../assets/B-Model.png";

import C_bovenprofiel from "../../assets/C-bovenprofiel.png";
import C_zijkant from "../../assets/C-zijprofiel.png";
import C_intern from "../../assets/C-Model.png";

const tabs = [
  {
    name: "Motor A",
    images: [A_bovenprofiel, A_zijkant, A_intern],
    orders: [
      { id: 1, amount: 10, date: "2025-06-01" },
      { id: 2, amount: 5, date: "2025-06-03" },
    ],
  },
  {
    name: "Motor B",
    images: [B_bovenprofiel, B_zijkant, B_intern],
    orders: [
      { id: 3, amount: 8, date: "2025-06-05" },
    ],
  },
  {
    name: "Motor C",
    images: [C_bovenprofiel, C_zijkant, C_intern],
    orders: [
      { id: 4, amount: 12, date: "2025-06-06" },
    ],
  },
];

const ProductionPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab];

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${activeTab === index ? styles.active : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className={styles.imageGrid}>
        {currentTab.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${currentTab.name} structuur ${i + 1}`}
            className={styles.image}
          />
        ))}
      </div>

      {/*
      <div className={styles.tableContainer}>
        <h2>Orders voor {currentTab.name}</h2>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div>ID</div>
            <div>Aantal</div>
            <div>Datum</div>
          </div>
          {currentTab.orders.map((order) => (
            <div className={styles.tableRow} key={order.id}>
              <div>{order.id}</div>
              <div>{order.amount}</div>
              <div>{order.date}</div>
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  );
};

export default ProductionPage;
