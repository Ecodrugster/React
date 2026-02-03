function ProductCard({ title, price, inStock }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Цена: {price}</p>
      <p>{inStock ? "В наличии" : "Нет в наличии"}</p>
    </div>
  )
}
export default ProductCard
