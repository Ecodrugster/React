import Logo from "./Logo";
import Nav from "./Nav";
import ToggleThemeButton from "./ToggleThemeButton";

function Header({ theme, setTheme }) {
  return (
    <header className="header">
      <Logo />
      <Nav />
      <div className="right-block">
        <Logo small />
        <ToggleThemeButton theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}

export default Header;