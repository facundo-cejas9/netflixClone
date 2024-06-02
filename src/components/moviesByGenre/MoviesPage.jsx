import React, { useEffect, useState } from 'react';
import '../moviesByGenre/moviesPage.css';
import { Link } from 'react-router-dom';

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const dataFetch = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer tuToken'
                }
            };

            const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
            const data = await response.json();

            const filterGenres = ['Action', 'Comedy', 'Adventure', 'Animation', 'Horror', 'Drama', 'Romance'];
            const filteredMovies = data.genres.filter(movie => filterGenres.includes(movie.name));
            setMovies(filteredMovies);
        };

        dataFetch();
    }, []);

    

    return (
        <div className='cards-genres'>
            {movies.map((movie) => (
                <div className='movies-genres' key={movie.id}>
                    <h3>{movie.name}</h3>
                    {/* Agrega una función anónima para pasar el id al manejador onClick */}
                    <Link to={`/category/${movie.id}`}>
                        <img src={`/posters/${movie.name}.jpg`} alt={movie.name} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default MoviesPage;
