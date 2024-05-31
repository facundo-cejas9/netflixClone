import { Navbar } from "../../Navbar/Navbar";
import "./Home.css";
import HeroBanner from "../../../assets/hero_banner.jpg";
import HeroTitle from "../../../assets/hero_title.png";
import PlayBtn from "../../../assets/play_icon.png";
import InfoBtn from "../../../assets/info_icon.png";
import { TitleCards } from "../../TitleCards/TitleCards";
import { Footer } from "../../Footer/Footer";

export default function HomePage() {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img className="banner-img" alt="BannerImage" src={HeroBanner} />
        <div className="hero-caption">
          <img className="caption-img" src={HeroTitle} alt="heroTitle" />
          <p>
            Dados poderes místicos por un recuerdo icónico, un joven se embarca
            en una búsqueda para luchar contra las fuerzas sombrías y resolver
            un misterio de su pasado.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={PlayBtn} alt="PlayButton" />
              Play
            </button>
            <button className="btn dark-btn" >
              <img src={InfoBtn} alt="Infobutton" />
              Más Info
            </button>
          </div>
          <div className="title-cards">
          <TitleCards title={"Popular"} category={"popular"} />
          </div>
          
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Now playing"} category={"now_playing"}  />
        <TitleCards title={"Pronto en Netflix"} category={"upcoming"} />
        <TitleCards title={"Recomendaciones para ti"} category={"top_rated"} />
      </div>
      <Footer />
    </div>
  );
}
