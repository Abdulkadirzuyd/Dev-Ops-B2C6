import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ importeer deze
import styles from './LoginStyle.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ⬅️ gebruik de hook

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
  localStorage.setItem("userId", result.user_id);
  navigate("/home", { replace: true });
} else {
      alert("Fout: " + result.message);
    }
  } catch (err) {
    alert("Serverfout: " + err.message);
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
