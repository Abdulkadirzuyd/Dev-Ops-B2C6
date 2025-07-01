import React, { useState } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      red: 20,
      blue: 30,
      grey: 20,
      date: "2025-06-30",
    },
  ]);

  const [form, setForm] = useState({
    red: "",
    blue: "",
    grey: "",
  });

  const handleChange = (color, value) => {
    setForm((prev) => ({
      ...prev,
      [color]: value,
    }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const hasAmount = Object.values(form).some((val) => parseInt(val) > 0);
    if (!hasAmount) return;

    const newOrder = {
      id: orders.length + 1,
      red: parseInt(form.red) || 0,
      blue: parseInt(form.blue) || 0,
      grey: parseInt(form.grey) || 0,
      date: new Date().toISOString().split("T")[0],
    };

    setOrders([newOrder, ...orders]);
    setForm({ red: "", blue: "", grey: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nieuwe bestelling</h2>

      <form className={styles.form} onSubmit={handleOrderSubmit}>
        {["red", "blue", "grey"].map((color) => (
          <input
            key={color}
            type="number"
            min="0"
            placeholder={color.charAt(0).toUpperCase() + color.slice(1)}
            className={styles.input}
            value={form[color]}
            onChange={(e) => handleChange(color, e.target.value)}
          />
        ))}

        <button type="submit" className={styles.button}>
          Bestellen
        </button>
      </form>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.leftGroup}>
            <div>ID</div>
            <div>Red</div>
            <div>Blue</div>
            <div>Grey</div>
          </div>
          <div className={styles.rightGroup}>
            <div>Datum</div>
          </div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className={styles.tableRow}>
            <div className={styles.leftGroup}>
              <div>{order.id}</div>
              <div>{order.red}</div>
              <div>{order.blue}</div>
              <div>{order.grey}</div>
            </div>
            <div className={styles.rightGroup}>
              <div>{order.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoragePage;
