import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../componets/MovieCard";

const API_KEY = "402d709d";

const Populares = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Función para obtener películas populares aleatorias
  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const popularKeywords = ["Avengers", "Batman", "Spider", "Harry", "Star Wars"];
      const randomKeyword = popularKeywords[Math.floor(Math.random() * popularKeywords.length)];

      const response = await axios.get(
        `https://www.omdbapi.com/?s=${randomKeyword}&type=movie&apikey=${API_KEY}`
      );

      if (response.data.Response === "True") {
        // Mezclar las películas para mayor aleatoriedad
        const shuffledMovies = response.data.Search.sort(() => 0.5 - Math.random());
        setMovies(shuffledMovies.slice(0, 8)); // Mostrar 8 películas
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener películas populares:", error);
      setLoading(false);
    }
  };

  // 🔹 Cargar las películas al montar el componente
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // 🔹 Actualizar el contenido al hacer clic en el botón
  const handleRefresh = () => {
    fetchPopularMovies();
  };

  return (
    <div className="movies-section">
      <h2>🔥 Películas Populares</h2>

      <button onClick={handleRefresh} className="refresh-btn">
        🔄 Actualizar Contenido
      </button>

      {loading && <p>Cargando películas...</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Populares;

