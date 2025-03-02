import React, { useState } from "react";
import axios from "axios";
import MovieCard from "../componets/MovieCard";
import FeaturedMovies from "../componets/FeaturedMovies";
import backgroundVideo from "../assets/video/background.mp4";

const Home = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=402d709d&s=${search}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  };

  return (
    <div className="home">
      {/* Video de fondo */}
      <div className="video-background">
      <video autoPlay loop muted className="background-video">
      <source src={backgroundVideo} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
      

      {/* Contenido principal */}
      <div className="home-content">
        <h1>MovieSpotter 🎬</h1>
        <input className= "search-bar"
          type="text"
          placeholder="Buscar películas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchMovies}>Buscar</button>

        {/* Sección de películas destacadas */}
        <FeaturedMovies />

        {/* Resultados de búsqueda */}
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p>No se encontraron películas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;