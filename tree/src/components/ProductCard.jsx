function ProductCard({ product, onRemove, onInc, onDec }) {
  return (
    <div style={cardStyle}>
      <div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>Qty: {product.qty}</p>
      </div>

      <div>
        <button onClick={() => onInc(product.id)}>+</button>
        <button onClick={() => onDec(product.id)}>-</button>
        <button onClick={() => onRemove(product.id)}>Remove</button>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
};

export default ProductCard;