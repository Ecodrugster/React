import ProductCard from "./ProductCard";

function ProductList({ products, onRemove, onInc, onDec }) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onRemove={onRemove}
          onInc={onInc}
          onDec={onDec}
        />
      ))}
    </div>
  );
}

export default ProductList;