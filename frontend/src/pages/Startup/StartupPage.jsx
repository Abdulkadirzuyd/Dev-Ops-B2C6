import { useNavigate } from 'react-router-dom';
import styles from './StartupStyle.module.css';
import logo from '../../assets/banaanlogo.png';
import { useEffect } from 'react';

export default function StartupPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll uitschakelen
    document.body.style.overflow = 'hidden';

    return () => {
      // Scroll weer inschakelen als je van de pagina af gaat
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1>Welkom bij ons ERP Systeem</h1>
      <h1>Casus team Banaan 🍌</h1>
      <div className={styles.buttons}>
      <button className={styles.button} onClick={() => navigate('/login')}>
        Login
        </button>
        <button className={styles.button} onClick={() => navigate('/register')}>
        Registreer
      </button>
      </div>
    </div>
  );
}
