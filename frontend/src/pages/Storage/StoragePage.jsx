import React, { useState } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [selectedColor, setSelectedColor] = useState("");

  // Mockdata: gegenereerde bestellingen met datum
  const orders = [...Array(13)].map((_, i) => {
    const date = `2025-06-${String(i + 1).padStart(2, "0")}`;
    return {
      amount: Math.floor(Math.random() * 100),
      date,
    };
  });

  // Sorteer op datum, nieuwste eerst
  const sortedOrders = orders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className={styles.storageContainer}>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.grey} ${
            selectedColor === "grey" ? styles.active : ""
          }`}
          onClick={() => setSelectedColor("grey")}
        >
          Grijs
        </button>
        <button
          className={`${styles.button} ${styles.blue} ${
            selectedColor === "blue" ? styles.active : ""
          }`}
          onClick={() => setSelectedColor("blue")}
        >
          Blauw
        </button>
        <button
          className={`${styles.button} ${styles.red} ${
            selectedColor === "red" ? styles.active : ""
          }`}
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

        {sortedOrders.map((order, i) => (
          <div className={styles.tableRow} key={i}>
            <div>{order.amount}</div>
            <div>{order.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoragePage;
