import React, { useEffect, useState } from "react";
import styles from "./PlanningStyle.module.css";

function PlanningPage() {
  const [orders, setOrders] = useState([]);
  const [geselecteerdeOrder, setGeselecteerdeOrder] = useState(null);
  const [gekozenLijn, setGekozenLijn] = useState("");
  const [gekozenPiklijst, setGekozenPiklijst] = useState("");

  const receptPerProduct = {
    A: { rood: 3, blauw: 2, geel: 1 },
    B: { rood: 2, blauw: 3, geel: 2 },
    C: { rood: 1, blauw: 2, geel: 3 },
  };

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Fout bij ophalen van orders:", err));
  }, []);

  const verwerkOrder = async (orderId) => {
    const aangepasteOrder = {
      picklist: gekozenPiklijst,
      production_line: gekozenLijn,
    };

    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aangepasteOrder),
      });

      if (response.ok) {
        const updated = await response.json();
        console.log("Updated order from API:", updated);
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? updated : o))
        );
        setGeselecteerdeOrder(null);
        setGekozenLijn("");
        setGekozenPiklijst("");
      } else {
        alert("Fout bij opslaan van de order");
      }
    } catch (err) {
      console.error("Fout bij versturen van order:", err);
    }
  };

  const berekenBlokken = (product, aantal) => {
    const recept = receptPerProduct[product];
    return {
      rood: recept.rood * aantal,
      blauw: recept.blauw * aantal,
      geel: recept.geel * aantal,
    };
  };

  const vernieuwPagina = () => window.location.reload();

  return (
    <div className={styles.container}>
      <div className={styles.refreshContainer}>
        <button className={styles.refreshButton} onClick={vernieuwPagina}>
          Ververs pagina
        </button>
      </div>

      <h1 className={styles.title}>Planning Dashboard</h1>

      <div className={styles.mainContent}>
        {/* Orders */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.leftGroup}>
              <div>Ordernummer</div>
              <div>Product</div>
              <div>Aantal</div>
            </div>
            <div className={styles.rightGroup}>
              <div>Piklijst</div>
              <div>Productielijn</div>
              <div>Acties</div>
            </div>
          </div>

          {orders.map((order) => (
            <div key={order.id} className={styles.tableRow}>
              <div className={styles.leftGroup}>
                <div>{order.id}</div>
                <div>{order.product_name}</div>
                <div>{order.quantity}</div>
              </div>
              <div className={styles.rightGroup}>
                <div>{order.picklist || "-"}</div>
                <div>{order.production_line || "-"}</div>
                <div>
                  <button
                    className={styles.button}
                    onClick={() => setGeselecteerdeOrder(order)}
                  >
                    Invullen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulier altijd zichtbaar */}
        <div className={styles.formContainer}>
          <h3>Order invullen</h3>
          {geselecteerdeOrder ? (
            <>
              <p>Ordernummer: {geselecteerdeOrder.id}</p>
              <p>Product: {geselecteerdeOrder.product_name}</p>
              <p>Aantal: {geselecteerdeOrder.quantity}</p>
              <p>Benodigde blokken:</p>
              <ul>
                {Object.entries(
                  berekenBlokken(
                    geselecteerdeOrder.product_name,
                    geselecteerdeOrder.quantity
                  )
                ).map(([kleur, aantal]) => (
                  <li key={kleur}>
                    {kleur}: {aantal}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Klik op een order om te bewerken.</p>
          )}

          <label>Kies een piklijst:</label>
          <div>
            {["A", "B", "C"].map((optie) => (
              <label key={optie} style={{ marginRight: "1rem" }}>
                <input
                  type="radio"
                  name="piklijst"
                  value={optie}
                  checked={gekozenPiklijst === optie}
                  onChange={(e) => setGekozenPiklijst(e.target.value)}
                />
                Piklijst {optie}
              </label>
            ))}
          </div>

          <br />

          <label>Kies een productielijn:</label>
          <div>
            {["A", "B"].map((lijn) => (
              <label key={lijn} style={{ marginRight: "1rem" }}>
                <input
                  type="radio"
                  name="productielijn"
                  value={lijn}
                  checked={gekozenLijn === lijn}
                  onChange={(e) => setGekozenLijn(e.target.value)}
                />
                Lijn {lijn}
              </label>
            ))}
          </div>

          <br />

          <button
            className={styles.button}
            onClick={() =>
              geselecteerdeOrder && verwerkOrder(geselecteerdeOrder.id)
            }
            disabled={!gekozenLijn || !gekozenPiklijst || !geselecteerdeOrder}
          >
            Verzend order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanningPage;
