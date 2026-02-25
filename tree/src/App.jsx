import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import styles from "./App.module.css";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const incQty = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const decQty = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.qty > 1
          ? { ...p, qty: p.qty - 1 }
          : p
      )
    );
  };

  // Общая сумма
  const total = products.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  return (
    <div className={styles.app}>
      <h1>Mini Shop Cart</h1>

      <ProductForm onAdd={addProduct} />

      <ProductList
        products={products}
        onRemove={removeProduct}
        onInc={incQty}
        onDec={decQty}
      />

      <h2 className={styles.total}>
        Total: ${total.toFixed(2)}
      </h2>
    </div>
  );
}

export default App;