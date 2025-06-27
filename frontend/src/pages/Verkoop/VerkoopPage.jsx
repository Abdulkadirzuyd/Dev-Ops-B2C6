// Imports
import styles from './VerkoopStyle.module.css';

// Component: VerkoopPage
export default function VerkoopPage() {
  return (
    <div className={styles.container}>

      // Titel
      <h2 className={styles.title}>Verkoop</h2>

      // Knoppen (Zoeken & Sorteren)
      <div className={styles.controls}>
        <button className={styles.button}>Zoeken</button>
        <button className={styles.button}>Sorteren</button>
      </div>

      // Tabel: Verkoopgegevens
      <table className={styles.table}>
        <thead>
          <tr>
            <th>OrderNummer</th>
            <th>Klant</th>
            <th>Producten</th>
            <th>Besteldatum</th>
            <th>Verwachte levering</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Hier komen dynamisch gegenereerde rijen */}
        </tbody>
      </table>

    </div>
  );
}
