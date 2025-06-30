import React, { useState, useEffect } from 'react';
import styles from './OrderStyle.module.css';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleApprove = async (index, id) => {
    const updatedOrder = { ...orders[index], status: "goedgekeurd" };

    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        const updated = [...orders];
        updated[index] = updatedOrder;
        setOrders(updated);
      } else {
        alert("Error approving order");
      }
    } catch (err) {
      console.error("PUT error (approve):", err);
    }
  };

  const handleForward = async (index, id) => {
    const updatedOrder = { ...orders[index], status: "doorgestuurd" };

    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        const updated = [...orders];
        updated[index] = updatedOrder;
        setOrders(updated);
      } else {
        alert("Error forwarding order");
      }
    } catch (err) {
      console.error("PUT error (forward):", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.refreshContainer}>
        <button onClick={handleRefresh} className={styles.refreshButton}>
          Refresh Page
        </button>
      </div>
      <h1 className={styles.title}>Order Management</h1>

      <input
        type="text"
        placeholder="Search by ID, quantity or product"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.leftGroup}>
            <div>Order #</div>
            <div>Quantity</div>
            <div>Product</div>
          </div>
          <div className={styles.rightGroup}>
            <div>Created At</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
        </div>

        {orders
          .filter((order) =>
            [order.id, order.quantity, order.product_name]
              .join(" ")
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((order, index) => (
            <div key={order.id} className={styles.tableRow}>
              <div className={styles.leftGroup}>
                <div>{order.id}</div>
                <div>{order.quantity}</div>
                <div>{order.product_name}</div>
              </div>
              <div className={styles.rightGroup}>
                <div>{order.created_at}</div>
                  <div>
                  {order.status === "in_behandeling" && (
                    <button
                      className={styles.button}
                      onClick={() => handleApprove(index, order.id)}
                    >
                      Approve
                    </button>
                  )}
                  {order.status === "goedgekeurd" && (
                    <button
                      className={styles.button}
                      onClick={() => handleForward(index, order.id)}
                    >
                      Forward
                    </button>
                  )}
                  {order.status === "doorgestuurd" && (
                    <span className={styles.check}>✔</span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
