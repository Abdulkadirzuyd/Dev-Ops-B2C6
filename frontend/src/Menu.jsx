import React from 'react';

const Menu = () => {
  return (
    <div style={styles.container}>
      <h1>ERP Systeem - Hoofdmenu</h1>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}><a href="/dashboard" style={styles.link}>Dashboard</a></li>
          <li style={styles.li}><a href="/voorraad" style={styles.link}>Voorraad</a></li>
          <li style={styles.li}><a href="/inkoop" style={styles.link}>Inkoop</a></li>
          <li style={styles.li}><a href="/verkoop" style={styles.link}>Verkoop</a></li>
          <li style={styles.li}><a href="/rapporten" style={styles.link}>Rapporten</a></li>
          <li style={styles.li}><a href="/instellingen" style={styles.link}>Instellingen</a></li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '30px auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  nav: {
    marginTop: '20px',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
  },
  li: {
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none',
    fontSize: '18px',
    color: '#007bff',
  }
};

export default Menu;
