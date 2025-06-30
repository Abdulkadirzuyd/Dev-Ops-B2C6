import React, { useState } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [selectedColor, setSelectedColor] = useState(""); // filterkleur
  const [orders, setOrders] = useState([
    { amount: 20, date: "2025-06-01", colors: ["grey"] },
    { amount: 10, date: "2025-06-02", colors: ["blue"] },
    { amount: 15, date: "2025-06-03", colors: ["red"] },
  ]);

  // Formulier state
  const [formColors, setFormColors] = useState([]);
  const [formAmount, setFormAmount] = useState("");

  const toggleFormColor = (color) => {
    setFormColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (!formAmount || isNaN(formAmount) || formAmount <= 0) return;
    if (formColors.length === 0) return; // Minstens 1 kleur selecteren

    const newOrder = {
      amount: parseInt(formAmount),
      date: new Date().toISOString().split("T")[0],
      colors: formColors,
    };

    setOrders([newOrder, ...orders]);
    setFormAmount("");
    setFormColors([]);
  };

  // Filter op kleur
  const filteredOrders = selectedColor
    ? orders.filter((o) => o.colors.includes(selectedColor))
    : orders;

  // Sorteer op datum (nieuwste eerst)
  const sortedOrders = filteredOrders
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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

        {sortedOrders.length > 0 ? (
          sortedOrders.map((order, i) => (
            <div className={styles.tableRow} key={i}>
              <div>{order.amount}</div>
              <div>{order.date}</div>
              <div>{order.colors.join(", ")}</div>
            </div>
          ))
        ) : (
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
