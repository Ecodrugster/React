import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ProductGrid from "./ProductGrid";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const firstEight = data.slice(0, 8);
        setProducts(firstEight);
        setFilteredProducts(firstEight);
      })
      .catch(() => {
        setError("Ошибка загрузки товаров");
      });
  }, []);

  const handleSearch = (query) => {
    const result = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(result);
  };

  if (error) return <p>{error}</p>;

  return (
    <main className="main">
      <h2>Products</h2>
      <SearchBar onSearch={handleSearch} />
      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default ProductsPage;