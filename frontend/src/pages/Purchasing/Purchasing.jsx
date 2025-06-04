import React, { useState } from 'react';
import styles from './PurchasingStyle.module.css';

export default function Purchasing() {
  const [orders, setOrders] = useState([
    {
        orderNummer: '1001',
        leverancier: 'Dev',
        artikelen: 'Dummy',
        besteldatum: '2025-05-03',
        verwachteLevering: '2025-05-07',
        gereserveerd: 'Ja',
      },
      {
        orderNummer: '1002',
        leverancier: 'Zuyd',
        artikelen: 'afs',
        besteldatum: '2025-05-01',
        verwachteLevering: '2025-05-04',
        gereserveerd: 'Nee',
      },
      {
        orderNummer: '1003',
        leverancier: 'Ops',
        artikelen: 'Banaan',
        besteldatum: '2025-05-02',
        verwachteLevering: '2025-05-05',
        gereserveerd: 'Nee',
      },
    ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');

  const filteredOrders = orders
    .filter((order) =>
      order.artikelen.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === 'orderNummer') {
        return a.orderNummer.localeCompare(b.orderNummer);
      } else if (sortKey === 'besteldatum') {
        return new Date(a.besteldatum) - new Date(b.besteldatum);
      } else {
        return 0;
      }
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inkoopoverzicht</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Zoek op artikel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className={styles.dropdown}
        >
          <option value="">Sorteer op...</option>
          <option value="orderNummer">OrderNummer</option>
          <option value="besteldatum">Besteldatum</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div>OrderNummer</div>
          <div>Leverancier</div>
          <div>Artikelen</div>
          <div>Besteldatum</div>
          <div>Verwachte levering</div>
          <div>Gereserveerd</div>
        </div>

        {filteredOrders.map((item, index) => (
          <div key={index} className={styles.tableRow}>
            <div>{item.orderNummer}</div>
            <div>{item.leverancier}</div>
            <div>{item.artikelen}</div>
            <div>{item.besteldatum}</div>
            <div>{item.verwachteLevering}</div>
            <div>{item.gereserveerd}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
