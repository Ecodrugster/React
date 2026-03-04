import { useReducer } from "react";
import "./App.css";

const initialState = {
  items: [],
  form: { title: "", price: "" },
  errors: {},
  mode: "add",
  editingId: null,
};

function makeId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6)
    .toString(36)
    .padStart(4, "0")}`;
}

function validate(form) {
  const errors = {};

  if (!form.title.trim()) errors.title = "Название обязательно";

  const priceNum = Number(form.price);

  if (!form.price) errors.price = "Цена обязательна";
  else if (Number.isNaN(priceNum)) errors.price = "Цена должна быть числом";
  else if (priceNum <= 0) errors.price = "Цена должна быть > 0";

  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "RESET_FORM":
      return { ...state, form: { title: "", price: "" }, errors: {} };

    case "ADD_ITEM":
      return {
        ...state,
        items: [action.item, ...state.items],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.id),
        ...(state.editingId === action.id
          ? {
              mode: "add",
              editingId: null,
              form: { title: "", price: "" },
              errors: {},
            }
          : {}),
      };

    case "START_EDIT":
      return {
        ...state,
        mode: "edit",
        editingId: action.item.id,
        form: {
          title: action.item.title,
          price: String(action.item.price),
        },
        errors: {},
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        mode: "add",
        editingId: null,
        form: { title: "", price: "" },
        errors: {},
      };

    case "SAVE_EDIT":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, ...action.nextData } : it
        ),
        mode: "add",
        editingId: null,
        form: { title: "", price: "" },
        errors: {},
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isEdit = state.mode === "edit";

  const formatPrice = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";

  const totalPrice = state.items.reduce((sum, it) => sum + it.price, 0);

  const submit = (e) => {
    e.preventDefault();

    const errors = validate(state.form);
    dispatch({ type: "SET_ERRORS", errors });

    if (Object.keys(errors).length > 0) return;

    const title = state.form.title.trim();
    const price = Number(state.form.price);

    if (isEdit) {
      dispatch({
        type: "SAVE_EDIT",
        id: state.editingId,
        nextData: { title, price },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        item: { id: makeId(), title, price },
      });
      dispatch({ type: "RESET_FORM" });
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Редактировать товар" : "Добавить товар"}</h2>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Название"
          value={state.form.title}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "title",
              value: e.target.value,
            })
          }
        />
        {state.errors.title && (
          <div className="error">{state.errors.title}</div>
        )}

        <input
          type="text"
          placeholder="Цена"
          value={state.form.price}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "price",
              value: e.target.value,
            })
          }
        />
        {state.errors.price && (
          <div className="error">{state.errors.price}</div>
        )}

        <button type="submit">
          {isEdit ? "Сохранить" : "Добавить"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={() => dispatch({ type: "CANCEL_EDIT" })}
          >
            Отмена
          </button>
        )}
      </form>

      <ul>
        {state.items.length === 0 ? (
          <li>Список пуст</li>
        ) : (
          state.items.map((it) => (
            <li key={it.id}>
              <span>{it.title}</span>
              <span>{formatPrice(it.price)}</span>

              <button
                onClick={() =>
                  dispatch({ type: "START_EDIT", item: it })
                }
              >
                Редактировать
              </button>

              <button
                onClick={() =>
                  dispatch({ type: "DELETE_ITEM", id: it.id })
                }
              >
                Удалить
              </button>
            </li>
          ))
        )}
      </ul>

      <h3>Total: {formatPrice(totalPrice)}</h3>
    </div>
  );
}