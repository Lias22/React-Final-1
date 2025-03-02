import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../componets/MovieCard";

const API_KEY = "402d709d";

const Recomendados = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRecommendedMovies = async () => {
    try {
      setLoading(true);
      const genres = ["action", "drama", "comedy", "sci-fi", "horror"];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];

      const response = await axios.get(
        `https://www.omdbapi.com/?s=${randomGenre}&type=movie&apikey=${API_KEY}&page=${page}`
      );

      if (response.data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener películas recomendadas:", error);
      setLoading(false);
    }
  };

  // 🔹 Cargar películas al montar el componente o al cambiar la página
  useEffect(() => {
    fetchRecommendedMovies();
  }, [page]);

  // 🔹 Manejar el botón "Cargar más"
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 🔹 Scroll infinito: Cargar más cuando el usuario llegue al final de la página
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="movies-section">
      <h2>🎬 Películas Recomendadas</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* 🔹 Botón "Cargar más" */}
      {!loading && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Cargar más
        </button>
      )}
      {loading && <p>Cargando más películas...</p>}
    </div>
  );
};

export default Recomendados;
