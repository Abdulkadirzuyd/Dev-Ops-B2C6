import React, { useState } from "react";
import styles from "./RegisterStyle.module.css";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        phone_number: "0612345678", // tijdelijk vast invullen of extra veld maken
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Registratie gelukt!");
    } else {
      alert("Fout: " + result.reason);
    }
  } catch (error) {
    alert("Server fout: " + error.message);
  }
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