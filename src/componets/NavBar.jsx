import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <h1 className={`title ${theme}`}>MovieSpotter</h1>
      <ul>
        <li>
          <Link to="/" className={`link ${theme}`}>Inicio</Link>
        </li>
        <li>
          <Link to="/Recomendados" className={`link ${theme}`}>Recomendados</Link>
        </li>
        <li>
          <Link to="/Populares" className={`link ${theme}`}>Populares</Link>
        </li>
        <li>
          <Link to="/Categories" className={`link ${theme}`}>Categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

