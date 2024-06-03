import { Link, useParams } from "react-router-dom";
import "./TitleCards.css";
import { useEffect, useRef, useState } from "react";

export const TitleCards = ({ title, category }) => {
  const [cardData, setCardData] = useState([]);
  const cardsRef = useRef();

  const { id } = useParams();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5OTM0YjAwZWZlNTAxMTI5Yjg0ZWFmYTQ3NDRkZSIsInN1YiI6IjYzNWYwYTBmMzM5NmI5MDA5MWQ3ZjMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T5F-sECLYUrfFckH_F8kyawSJw03RgCJLTycNl5VgVU`,
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setCardData(data.results);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();

    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener("wheel", handleWheel);
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular en Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cardData && cardData.length > 0 ? (
          cardData.map((card) => (

           
           
              <Link to={`/player/${card.id}`} className="card" key={card.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.title}
                />
                <h3>{card.title}</h3>
              </Link>
           
          ))
        ) : (
          <p>No data available</p> // Mostrar un mensaje si no hay datos
        )}
      </div>
    </div>
  );
};
