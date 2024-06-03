import React, { useEffect, useState } from "react";
import "../moviesByGenre/moviesPage.css";
import { Link } from "react-router-dom";

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5OTM0YjAwZWZlNTAxMTI5Yjg0ZWFmYTQ3NDRkZSIsInN1YiI6IjYzNWYwYTBmMzM5NmI5MDA5MWQ3ZjMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T5F-sECLYUrfFckH_F8kyawSJw03RgCJLTycNl5VgVU`,
        }
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const data = await response.json();
      const filterGenres = [
        "Action",
        "Comedy",
        "Adventure",
        "Animation",
        "Horror",
        "Drama",
        "Romance",
      ];
      const filteredMovies = data.genres.filter((movie) =>
        filterGenres.includes(movie.name)
      );
      setMovies(filteredMovies);
    };

    dataFetch();
  }, []);

  return (
    <>
      <h2 className="title-category">Categorias</h2>
      <div className="cards-genres">
        {movies.map((movie) => (
          <div className="movies-genres" key={movie.id}>
            <h3>{movie.name}</h3>
            {/* Agrega una función anónima para pasar el id al manejador onClick */}
            <Link to={`/category/${movie.id}`}>
              <img src={`/posters/${movie.name}.jpg`} alt={movie.name} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default MoviesPage;
