import React, { useState } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [selectedColor, setSelectedColor] = useState(""); // filterkleur
  const [orders, setOrders] = useState([
    { amount: 20, date: "2025-06-01", color: "grey" },
    { amount: 10, date: "2025-06-02", color: "blue" },
    { amount: 15, date: "2025-06-03", color: "red" },
  ]);

  // Bestelformulier state
  const [formColor, setFormColor] = useState("grey");
  const [formAmount, setFormAmount] = useState("");

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formAmount || isNaN(formAmount) || formAmount <= 0) return;

    const newOrder = {
      amount: parseInt(formAmount),
      date: new Date().toISOString().split("T")[0],
      color: formColor,
    };

    setOrders([newOrder, ...orders]);
    setFormAmount(""); // reset na bestelling
  };

  // Filter de bestellingen op kleur als er een filter is
  const filteredOrders = selectedColor
    ? orders.filter((o) => o.color === selectedColor)
    : orders;

  // Sorteer op datum
  const sortedOrders = filteredOrders.sort(
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
        <button
          className={`${styles.button} ${styles.red}`}  // rood maken
          onClick={() => setSelectedColor("")}
        >
          Alles tonen
        </button>
      </div>

      {/* 📝 Bestelformulier */}
      <form className={styles.form} onSubmit={handleOrderSubmit}>
        <label>
          Kies kleur:
          <select
            className={styles.coloredInput}   // nieuwe class voor input
            value={formColor}
            onChange={(e) => setFormColor(e.target.value)}
          >
            <option value="grey">Grijs</option>
            <option value="blue">Blauw</option>
            <option value="red">Rood</option>
          </select>
        </label>
        <label>
          Aantal blokken:
          <input
            className={styles.coloredInput}   // nieuwe class voor input
            type="number"
            min="1"
            value={formAmount}
            onChange={(e) => setFormAmount(e.target.value)}
          />
        </label>
        <button type="submit" className={`${styles.button} ${styles.red}`}>
          Bestellen
        </button>
      </form>

      {/* 📊 Tabel met bestellingen */}
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

        {sortedOrders.length === 0 && (
          <div className={styles.tableRow}>
            <div>Geen bestellingen gevonden.</div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoragePage;
