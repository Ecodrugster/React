function ToggleThemeButton({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ToggleThemeButton;