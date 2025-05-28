import { useNavigate } from 'react-router-dom';
import styles from './HomeStyle.module.css';
import logo from '../../assets/banaanlogo.png';

export default function HomePage() {
  const navigate = useNavigate();

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
