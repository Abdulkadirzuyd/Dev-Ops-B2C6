import React, { useState } from 'react';
import styles from './OrderStyle.module.css';
import { useEffect } from "react";


export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/orders")
    .then((res) => res.json())
    .then((data) => setOrders(data))
    .catch((err) => console.error("Fout bij ophalen orders:", err));
}, []);

  const handleApprove = async (index, id) => {
  const updatedOrder = { ...orders[index], goedgekeurd: true };

  try {
    const response = await fetch(`http://localhost:5000/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (response.ok) {
      const updated = [...orders];
      updated[index] = updatedOrder;
      setOrders(updated);
    } else {
      alert("Fout bij goedkeuren order");
    }
  } catch (err) {
    console.error("Fout bij fetch PUT:", err);
  }
};


  const handleForward = async (index, id) => {
  const updatedOrder = { ...orders[index], doorgestuurd: true };

  try {
    const response = await fetch(`http://localhost:5000/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (response.ok) {
      const updated = [...orders];
      updated[index] = updatedOrder;
      setOrders(updated);
    } else {
      alert("Fout bij doorsturen order");
    }
  } catch (err) {
    console.error("Fout bij fetch PUT:", err);
  }
};


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orderbeheer</h1>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.leftGroup}>
            <div>Order #</div>
            <div>Hoeveel</div>
            <div>Type</div>
          </div>
          <div className={styles.rightGroup}>
            <div>Besteldatum</div>
            <div>Status</div>
            <div>Acties</div>
          </div>
        </div>

        {orders.map((order, index) => (
          <div key={order.orderNummer} className={styles.tableRow}>
            <div className={styles.leftGroup}>
              <div>{order.orderNummer}</div>
              <div>{order.hoeveelheid}</div>
              <div>{order.productType}</div>
            </div>
            <div className={styles.rightGroup}>
              <div>{order.besteldatum}</div>
              <div>
                {order.doorgestuurd ? (
                  <span className={styles.badgeBlue}>Verzonden</span>
                ) : order.goedgekeurd ? (
                  <span className={styles.badgeYellow}>Goedgekeurd</span>
                ) : (
                  <span className={styles.badgeRed}>Wachtend</span>
                )}
              </div>
              <div>
                {!order.goedgekeurd && (
                  <button
                    className={styles.button}
                    onClick={() => handleApprove(index, order.id)}
                  >
                    Goedkeuren
                  </button>
                )}
                {order.goedgekeurd && !order.doorgestuurd && (
                  <button
                    className={styles.button}
                    onClick={() => handleForward(index, order.id)}
                  >
                    Door sturen
                  </button>
                )}
                {order.doorgestuurd && <span className={styles.check}>✔</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
