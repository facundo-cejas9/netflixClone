import "./Player.css";
import ArrowIcon from "../../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackpage = () => {
    navigate('/');
  }

  const [data, setData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5OTM0YjAwZWZlNTAxMTI5Yjg0ZWFmYTQ3NDRkZSIsInN1YiI6IjYzNWYwYTBmMzM5NmI5MDA5MWQ3ZjMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T5F-sECLYUrfFckH_F8kyawSJw03RgCJLTycNl5VgVU",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await response.json();
        setData(data.results[0]);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="player">
      <img className="arrow" onClick={handleBackpage} src={ArrowIcon} />
      <iframe
        src={`https://www.youtube.com/embed/${data.key}`}
        title="trailer"
        allowFullScreen
        
      ></iframe>
      <div className="player-info">
        <p>{data.name}</p>
        <p>{data.published_at.slice(0, 10)}</p>
        <p>{data.type}</p>
      </div>
    </div>
  )
}