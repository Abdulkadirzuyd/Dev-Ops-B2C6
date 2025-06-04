import { useState } from 'react';
import styles from './HomeStyle.module.css';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kun je inloggen verwerken, bv. API-call
    alert(`Inloggen met:\nEmail: ${email}\nWachtwoord: ${password}`);
  };

  return (
    <div className={styles.container}>
    
    </div>
  );
}
