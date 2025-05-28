import { useState } from "react";

export default function OrderControl() {
  const [order, setOrder] = useState({
    product_type: "",
    quantity: 1,
    order_date: "",
    signature: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...order,
          quantity: parseInt(order.quantity),
        }),
      });

      const data = await res.json();
      setResult(`${data.status.toUpperCase()}: ${data.message || data.reason}`);
    } catch (error) {
      setResult("Fout bij verzenden van order");
    }
  };

  return (
    <div>
      <h2>Order Controle</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Type (A/B/C):</label>
        <input name="product_type" value={order.product_type} onChange={handleChange} required /><br />

        <label>Aantal (1-3):</label>
        <input type="number" name="quantity" value={order.quantity} min="1" max="3" onChange={handleChange} required /><br />

        <label>Besteldatum:</label>
        <input type="date" name="order_date" value={order.order_date} onChange={handleChange} required /><br />

        <label>Paraaf klant:</label>
        <input name="signature" value={order.signature} onChange={handleChange} required /><br />

        <button type="submit">Verstuur</button>
      </form>
      <p>{result}</p>
    </div>
  );
}
