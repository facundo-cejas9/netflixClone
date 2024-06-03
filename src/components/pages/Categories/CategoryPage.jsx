import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Categories/categorys.css";
import BackArrow from '../../../assets/back_arrow_icon.png'

function CategoryPage() {
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackpage = () => {
    navigate(-1);
  };

 

  const titleCategories = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  const currentCategory = titleCategories.find(
    (c) => c.id.toString() === id
  )?.name;

  useEffect(() => {
    const fetchDataCategorys = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5OTM0YjAwZWZlNTAxMTI5Yjg0ZWFmYTQ3NDRkZSIsInN1YiI6IjYzNWYwYTBmMzM5NmI5MDA5MWQ3ZjMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T5F-sECLYUrfFckH_F8kyawSJw03RgCJLTycNl5VgVU`,
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${id}`,
          options
        );
        const data = await response.json();
        setCategory(data.results);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchDataCategorys();
  }, []);

  return (
    <>
      <h2 className="titleCurrentCategory">{currentCategory}</h2>
      <Link onClick={handleBackpage}>
        <img className="arrow-back" src={ BackArrow } />
      </Link>
      <div className="categorys">
        
        {category.map((item) => {
          return (
            <div className="card-categorys" key={item.id}>
              <Link className="link" to={`/player/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CategoryPage;
