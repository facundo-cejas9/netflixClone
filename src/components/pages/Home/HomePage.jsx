import { useEffect, useState } from "react";

import { Navbar } from "../../Navbar/Navbar";
import "./Home.css";
import HeroBanner from "../../../assets/hero_banner.jpg";
import HeroTitle from "../../../assets/hero_title.png";
import PlayBtn from "../../../assets/play_icon.png";
import InfoBtn from "../../../assets/info_icon.png";
import { TitleCards } from "../../TitleCards/TitleCards";
import { Footer } from "../../Footer/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
    };

    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      const data = await response.json();
      setDataMovies(data.results);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Slider {...settings}>
          {dataMovies.map((movie) => (
            <div key={movie.id} className="hero-slide">
              <img
                className="banner-img"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="hero-caption">
                <div className="movie-details">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
                <div className="hero-btns">
                  <button className="btn">
                    <img src={PlayBtn} alt="PlayButton" />
                    Play
                  </button>
                  <button className="btn dark-btn">
                    <img src={InfoBtn} alt="InfoButton" />
                    Más Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="more-cards">
        <TitleCards title={"Now playing"} category={"now_playing"} />
        <TitleCards title={"Pronto en Netflix"} category={"upcoming"} />
        <TitleCards title={"Recomendaciones para ti"} category={"top_rated"} />
      </div>
      <Footer />
    </div>
  );
}
