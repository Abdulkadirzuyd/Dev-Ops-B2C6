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

  const toggleFormColor = (color) => {
    setFormColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

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
    setFormColors([]);
  };

  // Filter de bestellingen op kleur als er een filter is
  const filteredOrders = selectedColor
    ? orders.filter((o) => o.color === selectedColor)
    : orders;

  // Sorteer op datum
  const sortedOrders = filteredOrders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

const handleRefresh = () => {
  window.location.reload();
};

   return (
    <div className={styles.storageContainer}>
      <div className={styles.refreshContainer}>
        <button onClick={handleRefresh} className={styles.refreshButton}>
          Pagina verversen
        </button>
      </div>

      <div className={styles.controls}>
        {["grey", "blue", "red"].map((color) => (
          <button
            key={color}
            className={`${styles.button} ${styles[color]} ${
              selectedColor === color ? styles.active : ""
            }`}
            onClick={() => setSelectedColor(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
        <button
          className={`${styles.button} ${styles.red}`}
          onClick={() => setSelectedColor("")}
        >
          Alles tonen
        </button>
      </div>

      {/* ✅ Nieuw formulier met meerdere kleuren */}
      <form className={styles.form} onSubmit={handleOrderSubmit}>
        <div className={styles.colorSelect}>
          {["grey", "blue", "red"].map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={formColors.includes(color)}
                onChange={() => toggleFormColor(color)}
              />
              {color}
            </label>
          ))}
        </div>

        <label>
          Aantal blokken:
          <input
            className={styles.coloredInput}
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

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Aantal blokken</div>
          <div>Besteldatum</div>
          <div>Kleuren</div>
        </div>

        {sortedOrders.map((order, i) => (
          <div className={styles.tableRow} key={i}>
            <div>{order.amount}</div>
            <div>{order.date}</div>
            <div>{order.colors.join(", ")}</div>
          </div>
        ))}

        {sortedOrders.length === 0 && (
          <div className={styles.tableRow}>
            <div>Geen bestellingen gevonden.</div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoragePage;
