import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/NavBar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Recomendados from "./pages/Recomendados";
import Populares from "./pages/Populares";
import Categories from "./pages/Categories";
import { ThemeProvider } from "./componets/ThemeProvider";
import ThemeToggle from "./componets/ThemeToggle";
import "./style/App.css";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <ThemeToggle />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/recomendados" element={<Recomendados />} />
            <Route path="/populares" element={<Populares />} />
            <Route path="/categories" element={<Categories />} /> 
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
