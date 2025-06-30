import React, { useState } from 'react';
import styles from './CustomerSimulationStyle.module.css';

export default function CustomerSimulationPage() {
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('A');
  const [quantity, setQuantity] = useState(1);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      alert('Please enter a valid order ID.');
      return;
    }

    if (quantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }

    const payload = {
      id: orderId.trim(),
      product_name: productName,
      quantity: Number(quantity),
      created_at: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Order added with ID: ${data.order_id}`);
        setOrderId('');
        setProductName('A');
        setQuantity(1);
      } else {
        alert(`Error adding order: ${data.reason || 'Unknown error'}`);
      }
    } catch (err) {
      alert("Error connecting to backend");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.refreshContainer}>
        <button className={styles.refreshButton} onClick={handleRefresh}>
          Refresh Page
        </button>
      </div>

      <h1 className={styles.title}>Customer Simulation - New Order</h1>

      <form className={styles.form} onSubmit={handleAddOrder}>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className={styles.input}
          required
        />

        <select
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={styles.select}
        >
          <option value="A">Type A</option>
          <option value="B">Type B</option>
          <option value="C">Type C</option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Add Order
        </button>
      </form>
    </div>
  );
}
