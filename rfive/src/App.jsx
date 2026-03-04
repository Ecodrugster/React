import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ProductsPage from "./components/Products/ProductsPage";
import "./styles/theme.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <ProductsPage />
    </>
  );
}

export default App;