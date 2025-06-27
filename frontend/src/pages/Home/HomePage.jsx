import { useState } from 'react';
import styles from './HomeStyle.module.css';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("Login succesvol!");
      // eventueel: sla token op in localStorage
      // localStorage.setItem("token", data.token);
    } else {
      alert("Login mislukt: " + (data.message || "onbekende fout"));
    }
  } catch (err) {
    console.error(err);
    alert("Fout bij verbinden met de server.");
  }

  setEmail('');
  setPassword('');
};


  return (
    <div className={styles.container}>
      <div className={styles.refreshContainer}>
        <button className={styles.refreshButton} onClick={handleRefresh}>
          Pagina verversen
        </button>
      </div>
    </div>
  );
}
