import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginStyle.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    email,
    password,
  };

  try {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      // tijdelijk: dummy response simulatie
      localStorage.setItem("userId", data.user_id || "dummyUser");
      navigate("/home", { replace: true });
    } else {
      alert("Login mislukt. Controleer je gegevens.");
    }
  } catch (err) {
    console.error("Fout bij login:", err);
    alert("Er ging iets mis met de verbinding.");
  }
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
          placeholder="jouw@email.com"
          // verwijderd required
        />

        <label htmlFor="password">Wachtwoord</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          // verwijderd required
        />

        <button type="submit" className={styles.button}>Inloggen</button>

        <button
          type="button"
          className={styles.button}
          onClick={() => navigate('/home', { replace: true })}
          >
          Ga door zonder in te loggen
      </button>
      </form>
    </div>
  );
}
