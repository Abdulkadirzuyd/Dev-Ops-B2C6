import React, { useEffect, useState } from "react";
import styles from "./PlanningStyle.module.css";

function PlanningPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedLine, setSelectedLine] = useState("");

  // vaste recepten per producttype
  const recipePerProduct = {
    A: { rood: 3, blauw: 2, geel: 1 },
    B: { rood: 2, blauw: 3, geel: 2 },
    C: { rood: 1, blauw: 2, geel: 3 },
  };

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Fout bij ophalen orders:", err));
  }, []);

  const handleForward = async (orderId) => {
    const updatedOrder = {
      ...selectedOrder,
      doorgestuurd: true,
      productielijn: selectedLine,
    };

    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? updatedOrder : o))
        );
        setSelectedOrder(null);
        setSelectedLine("");
      } else {
        alert("Fout bij doorsturen order");
      }
    } catch (err) {
      console.error("Fout bij fetch PUT:", err);
    }
  };

  const calculateBlocks = (product, amount) => {
    const recipe = recipePerProduct[product];
    return {
      rood: recipe.rood * amount,
      blauw: recipe.blauw * amount,
      geel: recipe.geel * amount,
    };
  };

  const handleRefresh = () => window.location.reload();

  return (
    <div className={styles.container}>
      <div className={styles.refreshContainer}>
        <button className={styles.refreshButton} onClick={handleRefresh}>
          Pagina verversen
        </button>
      </div>

      <h1 className={styles.title}>Planning Dashboard</h1>

      {/* openstaande orders */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.leftGroup}>
            <div>Order #</div>
            <div>Product</div>
            <div>Hoeveel</div>
          </div>
          <div className={styles.rightGroup}>
            <div>Status</div>
            <div>Actie</div>
          </div>
        </div>

        {orders
          .filter((o) => !o.doorgestuurd)
          .map((order) => (
            <div key={order.id} className={styles.tableRow}>
              <div className={styles.leftGroup}>
                <div>{order.orderNummer}</div>
                <div>{order.productType}</div>
                <div>{order.hoeveelheid}</div>
              </div>
              <div className={styles.rightGroup}>
                <div className={styles.badgeRed}>Wachtend</div>
                <button
                  className={styles.button}
                  onClick={() => setSelectedOrder(order)}
                >
                  Invullen
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* bestelformulier */}
      {selectedOrder && (
        <div className={styles.tableContainer}>
          <h3>Bestelformulier invullen</h3>
          <p>Order: {selectedOrder.orderNummer}</p>
          <p>Product: {selectedOrder.productType}</p>
          <p>Aantal: {selectedOrder.hoeveelheid}</p>
          <p>Blokjes totaal:</p>
          <ul>
            {Object.entries(
              calculateBlocks(
                selectedOrder.productType,
                selectedOrder.hoeveelheid
              )
            ).map(([kleur, aantal]) => (
              <li key={kleur}>
                {kleur}: {aantal}
              </li>
            ))}
          </ul>

          <label>Kies productielijn:</label>
          <div>
            {["A", "B"].map((lijn) => (
              <label key={lijn} style={{ marginRight: "1rem" }}>
                <input
                  type="radio"
                  name="productielijn"
                  value={lijn}
                  checked={selectedLine === lijn}
                  onChange={(e) => setSelectedLine(e.target.value)}
                />
                Lijn {lijn}
              </label>
            ))}
          </div>

          <button
            className={styles.button}
            onClick={() => handleForward(selectedOrder.id)}
            disabled={!selectedLine}
          >
            Order verzenden
          </button>
        </div>
      )}

      {/* verwerkte orders */}
      <div className={styles.tableContainer}>
        <h3>Verwerkte orders</h3>
        {orders
          .filter((o) => o.doorgestuurd)
          .map((order) => (
            <div key={order.id} className={styles.tableRow}>
              <div className={styles.leftGroup}>
                <div>{order.orderNummer}</div>
                <div>{order.productType}</div>
                <div>{order.hoeveelheid}</div>
              </div>
              <div className={styles.rightGroup}>
                <div className={styles.badgeBlue}>Verzonden</div>
                <div>Lijn {order.productielijn}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlanningPage;
