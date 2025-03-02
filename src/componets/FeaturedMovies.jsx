import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=402d709d&s=${search}`
        );
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error("Error al obtener películas destacadas:", error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <div className="featured-movies">
      <h2></h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
