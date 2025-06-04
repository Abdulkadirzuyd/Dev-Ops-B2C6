import React, { useState } from 'react';
import styles from './CustomerSimulationStyle.module.css';

export default function CustomerSimulationPage({ onAddOrder }) {
  // Form state
  const [newOrderNummer, setNewOrderNummer] = useState('');
  const [newProductType, setNewProductType] = useState('A');
  const [newHoeveelheid, setNewHoeveelheid] = useState(1);

  const handleAddOrder = (e) => {
    e.preventDefault();

    if (!newOrderNummer.trim()) {
      alert('Vul een geldig ordernummer in.');
      return;
    }
    if (newHoeveelheid < 1) {
      alert('Hoeveelheid moet minimaal 1 zijn.');
      return;
    }

    onAddOrder({
      orderNummer: newOrderNummer.trim(),
      besteldatum: new Date().toISOString().split('T')[0],
      productType: newProductType,
      hoeveelheid: Number(newHoeveelheid),
      goedgekeurd: false,
      doorgestuurd: false,
    });

    setNewOrderNummer('');
    setNewProductType('A');
    setNewHoeveelheid(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Simulation - Nieuwe Order</h1>

      <form className={styles.form} onSubmit={handleAddOrder}>
        <input
          type="text"
          placeholder="Ordernummer"
          value={newOrderNummer}
          onChange={(e) => setNewOrderNummer(e.target.value)}
          className={styles.input}
          required
        />

        <select
          value={newProductType}
          onChange={(e) => setNewProductType(e.target.value)}
          className={styles.select}
        >
          <option value="A">Type A</option>
          <option value="B">Type B</option>
          <option value="C">Type C</option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Hoeveelheid"
          value={newHoeveelheid}
          onChange={(e) => setNewHoeveelheid(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Order toevoegen
        </button>
      </form>
    </div>
  );
}
