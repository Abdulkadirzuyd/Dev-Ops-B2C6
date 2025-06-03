import React, { useState } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div className={styles.storageContainer}>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.grey} ${selectedColor === "grey" ? styles.active : ""}`}
          onClick={() => setSelectedColor("grey")}
        >
          Grijs
        </button>
        <button
          className={`${styles.button} ${styles.blue} ${selectedColor === "blue" ? styles.active : ""}`}
          onClick={() => setSelectedColor("blue")}
        >
          Blauw
        </button>
        <button
          className={`${styles.button} ${styles.red} ${selectedColor === "red" ? styles.active : ""}`}
          onClick={() => setSelectedColor("red")}
        >
          Rood
        </button>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Aantal blokken</div>
          <div>Besteldatum</div>
        </div>
        {[...Array(13)].map((_, i) => (
          <div className={styles.tableRow} key={i}>
            <div>{Math.floor(Math.random() * 100)}</div>
            <div>2025-06-{String(i + 1).padStart(2, "0")}</div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default StoragePage;
