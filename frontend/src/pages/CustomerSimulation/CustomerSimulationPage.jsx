import React, { useState } from 'react';
import styles from './CustomerSimulationStyle.module.css';

export default function CustomerSimulationPage({}) {
  // Form state
  const [newOrderNummer, setNewOrderNummer] = useState('');
  const [newProductType, setNewProductType] = useState('A');
  const [newHoeveelheid, setNewHoeveelheid] = useState(1);
const handleRefresh = () => {
  window.location.reload();
};

const handleAddOrder = async (e) => {
  e.preventDefault();

  if (!newOrderNummer.trim()) {
    alert('Vul een geldig ordernummer in.');
    return;
  }
  if (newHoeveelheid < 1) {
    alert('Hoeveelheid moet minimaal 1 zijn.');
    return;
  }

  const payload = {
    klantnaam: newOrderNummer.trim(),
    product_type: newProductType,
    quantity: Number(newHoeveelheid),
    order_date: new Date().toISOString().split('T')[0],
    signature: "simulatie123"
  };

  try {
    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Order toegevoegd met ID: ${data.order_id}`);
      setNewOrderNummer('');
      setNewProductType('A');
      setNewHoeveelheid(1);
    } else {
      alert(`Fout bij toevoegen: ${data.reason || 'Onbekende fout'}`);
    }
  } catch (err) {
    alert("Fout bij verbinding met backend");
    console.error(err);
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.refreshContainer}>
  <button className={styles.refreshButton} onClick={handleRefresh}>
     Pagina verversen
  </button>
</div>
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
          <option value="D">Onderhoud</option>
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
