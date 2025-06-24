import { useState } from 'react';
import styles from './HomeStyle.module.css';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kun je inloggen verwerken, bv. API-call
    alert(`Inloggen met:\nEmail: ${email}\nWachtwoord: ${password}`);
  };

  return (
  <div className={styles.container}>
    <div className={styles.refreshContainer}>
      <button className={styles.refreshButton} onClick={handleRefresh}>Pagina verversen</button>
    </div>
    <h1></h1>
    {/* Andere content hier */}
  </div>
);

}

