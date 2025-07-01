import React, { useState } from "react";
import styles from "./ProductionStyle.module.css";

const tabs = [
  {
    name: "Motor A",
    images: [
      "../assets/A-bovenprofiel.png",
      "../",
      "",
    ],
  },
  {
    name: "Motor B",
    images: [
      "",
      "",
      "",
    ],
  },
  {
    name: "Motor C",
    images: [
      "",
      "",
      "",
    ],
  },
];

const ProductionPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              activeTab === index ? styles.active : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className={styles.imageGrid}>
        {tabs[activeTab].images.map((src, i) => (
          <img key={i} src={src} alt={`Tab ${activeTab + 1} img ${i + 1}`} className={styles.image} />
        ))}
      </div>
    </div>
  );
};

export default ProductionPage;
