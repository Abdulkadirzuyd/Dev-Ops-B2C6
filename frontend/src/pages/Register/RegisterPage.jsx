import React, { useState } from "react";
import styles from "./RegisterStyle.module.css";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Hier kun je registratie verwerken, bv. API-call
      alert(`Registreren met:\nGebruikersnaam: ${username}\nEmail: ${email}\nWachtwoord: ${password}`);
    };
  
    return (
      <div className={styles.container}>
        <h1>Registreer</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username">Gebruikersnaam</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="bijv. jan123"
          />
  
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
  
          <button type="submit" className={styles.button}>Registreren</button>
        </form>
      </div>
    );
  }