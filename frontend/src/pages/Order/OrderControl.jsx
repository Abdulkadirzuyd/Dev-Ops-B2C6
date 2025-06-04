import React, { useState } from 'react';
import styles from './OrderStyle.module.css';

export default function OrderPage() {
  const [orders, setOrders] = useState([
    {
      orderNummer: '1001',
      besteldatum: '2025-05-03',
      productType: 'A',
      hoeveelheid: 2,
      goedgekeurd: false,
      doorgestuurd: false,
    },
    {
      orderNummer: '1002',
      besteldatum: '2025-05-01',
      productType: 'B',
      hoeveelheid: 5,
      goedgekeurd: true,
      doorgestuurd: false,
    },
    {
      orderNummer: '1003',
      besteldatum: '2025-05-02',
      productType: 'C',
      hoeveelheid: 3,
      goedgekeurd: true,
      doorgestuurd: true,
    },
  ]);

  const handleApprove = (index) => {
    const updated = [...orders];
    updated[index].goedgekeurd = true;
    setOrders(updated);
  };

  const handleForward = (index) => {
    const updated = [...orders];
    updated[index].doorgestuurd = true;
    setOrders(updated);
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
                    onClick={() => handleApprove(index)}
                  >
                    Goedkeuren
                  </button>
                )}
                {order.goedgekeurd && !order.doorgestuurd && (
                  <button
                    className={styles.button}
                    onClick={() => handleForward(index)}
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
