import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderControl from "./pages/OrderControl";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<OrderControl />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
