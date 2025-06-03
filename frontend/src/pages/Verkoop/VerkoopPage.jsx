// Imports
import styles from './VerkoopStyle.module.css';

// Component: VerkoopPage
export default function VerkoopPage() {
  return (
    <div className={styles.container}>

      {/* Titel */}
      <h2>Nieuwe Verkooporder</h2>

      {/* Formulier */}
      <form>

        <label htmlFor="ordernummer">Ordernummer</label>
        <input type="text" id="ordernummer" name="ordernummer" placeholder="Bijv. ORD00123" />

        <label htmlFor="klant">Klantnaam</label>
        <input type="text" id="klant" name="klant" placeholder="Naam van de klant" />

        <label htmlFor="producten">Product(en)</label>
        <input type="text" id="producten" name="producten" placeholder="Bijv. Model A, Model B" />

        <label htmlFor="datum">Besteldatum</label>
        <input type="date" id="datum" name="datum" />

        <label htmlFor="levering">Verwachte Levering</label>
        <input type="date" id="levering" name="levering" />

        <label htmlFor="status">Status</label>
        <input type="text" id="status" name="status" placeholder="Bijv. In behandeling" />

        <button type="submit" className={styles.button}>Verkooporder Aanmaken</button>

      </form>
    </div>
  );
}