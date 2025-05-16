import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('')  // Voor API-bericht

    // Zodra de app wordt geladen, haal het bericht op uit Flask
    useEffect(() => {
        fetch('http://172.201.187.117:5000/api/hello')
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error('Fout bij ophalen API:', err))
    }, [])

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Test</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <div style={{ marginTop: '2rem' }}>
                <strong>Bericht van de backend:</strong>
                <p>{message || 'Laden...'}</p>
            </div>
        </>
    )
}

export default App
