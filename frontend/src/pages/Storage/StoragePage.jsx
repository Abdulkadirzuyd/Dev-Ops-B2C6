import React, { useState, useEffect } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    red: "",
    blue: "",
    grey: "",
  });
  const [loading, setLoading] = useState(true);

  // Haal orders op bij laden
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/inventory");
        if (!res.ok) {
          throw new Error("Fout bij ophalen orders");
        }
        const data = await res.json();

        // Optioneel: data aanpassen als backend anders structuur heeft
        setOrders(
          data.map((item) => ({
            id: item.id,
            red: item.red,
            blue: item.blue,
            grey: item.grey,
            date: item.created_at || new Date().toISOString().split("T")[0],
          }))
        );
      } catch (err) {
        console.error(err);
        alert("Kon orders niet laden");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (color, value) => {
    setForm((prev) => ({
      ...prev,
      [color]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const hasAmount = Object.values(form).some((val) => parseInt(val) > 0);
    if (!hasAmount) {
      alert("Vul minimaal één kleur in met een hoeveelheid groter dan 0");
      return;
    }

    const newOrderPayload = {
      red: parseInt(form.red) || 0,
      blue: parseInt(form.blue) || 0,
      grey: parseInt(form.grey) || 0,
    };

    try {
      const response = await fetch("http://localhost:5000/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Fout bij opslaan order: " + (errorData.reason || "Onbekende fout"));
        return;
      }

      const result = await response.json();

      const newOrder = {
        id: result.id || orders.length + 1,
        ...newOrderPayload,
        date: new Date().toISOString().split("T")[0],
      };

      setOrders([newOrder, ...orders]);
      setForm({ red: "", blue: "", grey: "" });
    } catch (error) {
      console.error("Error bij opslaan:", error);
      alert("Kon order niet opslaan, probeer het later opnieuw.");
    }
  };

  if (loading) {
    return <div className={styles.container}>Laden...</div>;
  }

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
