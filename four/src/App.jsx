import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "food",
  });

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = products.filter((p) =>
  p.title.toLowerCase().includes(query.toLowerCase())
);

const sorted = visible.slice().sort((a, b) => a.price - b.price);

const filtered = sorted.filter((p) => {
  if (filter === "bought") return p.bought;
  if (filter === "not") return !p.bought;
  return true;
});
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const addProduct = () => {
  if (!form.title || !form.price) return;

  const newProduct = {
    id: Date.now(),   // ✅ уникальный id
    ...form,
    price: Number(form.price),
    bought: false
  };

  setProducts([...products, newProduct]);

  setForm({
    title: "",
    price: "",
    category: "food"
  });
};

  const toggleBought = (id) => {
  const updated = products.map((p) =>
    p.id === id ? { ...p, bought: !p.bought } : p
  );

  setProducts(updated);
};
  const addItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setItems([...items, trimmed]);
    setText("");
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const boughtCount = products.filter((p) => p.bought).length;

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <div>
            <h1 className="title">SmartLab</h1>
            
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat__label">Строк</div>
              <div className="stat__value">{items.length}</div>
            </div>
            <div className="stat">
              <div className="stat__label">Товаров</div>
              <div className="stat__value">{products.length}</div>
            </div>
            <div className="stat">
              <div className="stat__label">Купить</div>
              <div className="stat__value">{boughtCount}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="grid">
     
        <section className="card">
          <div className="card__head">
            <h2 className="card__title">SmartList v1</h2>
            <span className="badge">строки</span>
          </div>

          <div className="row">
            <input
              className="input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Напиши элемент…"
              onKeyDown={(e) => {
                if (e.key === "Enter") addItem();
              }}
            />
            <button className="btn btn--primary" onClick={addItem}>
              Добавить
            </button>
          </div>

          <p className="hint">
            Сейчас в input: <span className="mono">{text || "—"}</span>
          </p>

          {items.length === 0 ? (
            <div className="empty">
              <div className="empty__icon">📝</div>
              <div className="empty__title">Список пуст</div>
              <div className="empty__text">Добавь первый элемент в SmartList.</div>
            </div>
          ) : (
            <ul className="list">
              {items.map((item, i) => (
                <li className="list__item" key={i}>
                  <span className="list__text">{item}</span>
                  <button
                    className="iconBtn"
                    onClick={() => removeItem(i)}
                    aria-label="Удалить"
                    title="Удалить"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

    
        <section className="card">
          <div className="card__head">
            <h2 className="card__title">SmartShop v1</h2>
            <span className="badge badge--soft">products</span>
          </div>

          <div className="form">
            <div className="field">
              <label className="label">Название</label>
              <input
                className="input"
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Напр. Бургер"
              />
            </div>

            <div className="field">
              <label className="label">Цена</label>
              <input
                className="input"
                name="price"
                value={form.price}
                onChange={onChange}
                placeholder="Напр. 1200"
                inputMode="numeric"
              />
            </div>

            <div className="field">
              <label className="label">Категория</label>
              <select
                className="input"
                name="category"
                value={form.category}
                onChange={onChange}
              >
                <option value="food">food</option>
                <option value="tech">tech</option>
                <option value="other">other</option>
              </select>
            </div>

            <button className="btn btn--primary btn--full" onClick={addProduct}>
              Добавить товар
            </button>
          </div>

          <div className="row row--between row--mt">
            <div className="search">
              <span className="search__icon">⌕</span>
              <input
                className="input input--search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию…"
              />
            </div>

                <div className="filters">
  <button onClick={() => setFilter("all")}>Все</button>
  <button onClick={() => setFilter("bought")}>Купленные</button>
  <button onClick={() => setFilter("not")}>Не купленные</button>
</div>

            <div className="chips">
              <span className="chip">Всего: {products.length}</span>
              <span className="chip chip--accent">Найдено: {sorted.length}</span>
              <span className="chip chip--ok">Куплено: {boughtCount}</span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="empty">
              <div className="empty__icon">🛒</div>
              <div className="empty__title">Товаров пока нет</div>
              <div className="empty__text">Добавь первый товар через форму выше.</div>
            </div>
          ) : sorted.length === 0 ? (
            <div className="empty">
              <div className="empty__icon">🔎</div>
              <div className="empty__title">Ничего не найдено</div>
              <div className="empty__text">Попробуй изменить запрос поиска.</div>
            </div>
          ) : (
            <ul className="products">
              {filtered.map((p) => (
                <li key={p.id} className={`product ${p.bought ? "product--bought" : ""}`}>
                  <div className="product__main">
                    <div className="product__title">
                      {p.title}
                      {p.bought && <span className="tag">куплено</span>}
                    </div>
                    <div className="product__meta">
                      <span className="pill">{p.category}</span>
                      <span className="pill pill--money">{p.price} ₸</span>
                    </div>
                  </div>

                  <button
                    className={`btn btn--ghost ${p.bought ? "btn--ok" : ""}`}
                    onClick={() => toggleBought(p.id)}
                  >
                    {p.bought ? "Отменить" : "Купить"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

     
    </div>
  );
}