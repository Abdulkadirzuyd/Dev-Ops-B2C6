import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ importeer deze
import styles from './LoginStyle.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ⬅️ gebruik de hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simuleer een succesvolle login en navigeer naar de homepagina // ALLEEN VOOR DEVELOPMENT
    navigate('/home', { replace: true }); // ⬅️ vervangt /login in de browsergeschiedenis
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="jouw@email.com"
        />

        <label htmlFor="password">Wachtwoord</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />

        <button type="submit" className={styles.button}>Inloggen</button>
      </form>
    </div>
  );
}
