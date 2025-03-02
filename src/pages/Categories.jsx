import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../componets/MovieCard";

const Categories = () => {
  const [categories] = useState([
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Action");
  const [movies, setMovies] = useState([]);

  // Función para cargar películas según la categoría
  const fetchMoviesByCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=402d709d&s=${category}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error al cargar las películas por categoría:", error);
    }
  };

  // Cargar películas de la categoría seleccionada al montar el componente
  useEffect(() => {
    fetchMoviesByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="categories-section">
      <h2>Explorar por Categorías</h2>

      {/* Menú desplegable de categorías */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Mostrar las películas de la categoría seleccionada */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p>No hay películas disponibles para esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;