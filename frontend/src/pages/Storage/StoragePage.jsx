import React, { useState, useEffect } from "react";
import styles from "./StorageStyle.module.css";

const StoragePage = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    red: "",
    blue: "",
    grey: "",
    order_id: "",
    quantity: "",
    order_type: "",
    production_line: "",
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

        setOrders(
          data.map((item) => ({
            id: item.id,
            red: item.red,
            blue: item.blue,
            grey: item.grey,
            order_id: item.order_id,
            quantity: item.quantity,
            order_type: item.order_type,
            production_line: item.production_line,
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

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Minimaal 1 kleur > 0
    const hasAmount = ["red", "blue", "grey"].some(
      (color) => parseInt(form[color]) > 0
    );
    if (!hasAmount) {
      alert("Vul minimaal één kleur in met een hoeveelheid groter dan 0");
      return;
    }

    const newOrderPayload = {
      red: parseInt(form.red) || 0,
      blue: parseInt(form.blue) || 0,
      grey: parseInt(form.grey) || 0,
      order_id: form.order_id || null,
      quantity: form.quantity ? parseInt(form.quantity) : null,
      order_type: form.order_type || null,
      production_line: form.production_line || null,
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
      setForm({
        red: "",
        blue: "",
        grey: "",
        order_id: "",
        quantity: "",
        order_type: "",
        production_line: "",
      });
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
        {["red", "blue", "grey", "order_id", "quantity", "order_type", "production_line"].map((field) => (
          <input
            key={field}
            type={field === "quantity" || ["red", "blue", "grey"].includes(field) ? "number" : "text"}
            min={field === "quantity" || ["red", "blue", "grey"].includes(field) ? "0" : undefined}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className={styles.input}
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
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
            <div>Order ID</div>
            <div>Quantity</div>
            <div>Type</div>
            <div>Production line</div>
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
              <div>{order.order_id || "-"}</div>
              <div>{order.quantity ?? "-"}</div>
              <div>{order.order_type || "-"}</div>
              <div>{order.production_line || "-"}</div>
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
