import { useState } from "react";

function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    qty: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price) || 0,
      qty: Number(form.qty) || 1,
    };

    onAdd(newProduct);

    setForm({
      name: "",
      price: "",
      qty: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="qty"
        type="number"
        placeholder="Qty"
        value={form.qty}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
}

export default ProductForm;