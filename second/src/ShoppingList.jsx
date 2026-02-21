import { useState } from "react"
import "./ShoppingList.css"

export default function ShoppingList() {
  const [title, setTitle] = useState("")
  const [qty, setQty] = useState("")
  const [items, setItems] = useState([])
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editQty, setEditQty] = useState("")
  const [filter, setFilter] = useState("all")

  const addItem = () => {
    if (title.trim() === "") return

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      qty: qty === "" || Number(qty) < 1 ? 1 : Number(qty),
      bought: false
    }

    setItems([...items, newItem])
    setTitle("")
    setQty("")
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const toggleBought = (id) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    )
  }

  const startEdit = (item) => {
    setEditId(item.id)
    setEditTitle(item.title)
    setEditQty(item.qty)
  }

  const saveEdit = (id) => {
    if (editTitle.trim() === "") return

    setItems(
      items.map(item =>
        item.id === id
          ? {
              ...item,
              title: editTitle.trim(),
              qty: editQty === "" || Number(editQty) < 1 ? 1 : Number(editQty)
            }
          : item
      )
    )

    setEditId(null)
    setEditTitle("")
    setEditQty("")
  }

  const filteredItems = items.filter(item => {
    if (filter === "bought") return item.bought
    if (filter === "notBought") return !item.bought
    return true
  })

  const total = items.length
  const boughtCount = items.filter(item => item.bought).length
  const remaining = total - boughtCount

  return (
    <div className="shopping">
      <h2>Shopping List</h2>

      <div className="shopping-top">
        <span>Всего: {total}</span>
        <span>Куплено: {boughtCount}</span>
        <span>Осталось: {remaining}</span>
      </div>

      <div className="shopping-inputs">
        <input
          className="title"
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="qty"
          type="number"
          min="1"
          placeholder="Кол-во"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <button onClick={addItem}>Добавить</button>
      </div>

      <div className="shopping-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Все
        </button>
        <button
          className={filter === "bought" ? "active" : ""}
          onClick={() => setFilter("bought")}
        >
          Куплено
        </button>
        <button
          className={filter === "notBought" ? "active" : ""}
          onClick={() => setFilter("notBought")}
        >
          Не куплено
        </button>
      </div>

      <ul className="shopping-list">
        {filteredItems.map(item => (
          <li
            key={item.id}
            className={`shopping-item ${item.bought ? "done" : ""}`}
          >
            <div className="shopping-left">
              <input
                type="checkbox"
                checked={item.bought}
                onChange={() => toggleBought(item.id)}
              />

              {editId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    value={editQty}
                    onChange={(e) => setEditQty(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <span className="shopping-title">{item.title}</span>
                  <span className="shopping-qty">x{item.qty}</span>
                </>
              )}
            </div>

            <div className="shopping-actions">
              {editId === item.id ? (
                <button onClick={() => saveEdit(item.id)}>Сохранить</button>
              ) : (
                <>
                  <button onClick={() => startEdit(item)}>✏</button>
                  <button onClick={() => deleteItem(item.id)}>🗑</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

