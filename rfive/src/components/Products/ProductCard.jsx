function ProductCard({ product }) {
  const shortDescription =
    product.description.length > 80
      ? product.description.slice(0, 80) + "..."
      : product.description;

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{shortDescription}</p>
      <p>⭐{product.rating?.rate || "No rating"}</p>
      <p>${product.price}</p>
      <button onClick={() => alert(product.title)}>MORE</button>
    </div>
  );
}

export default ProductCard;