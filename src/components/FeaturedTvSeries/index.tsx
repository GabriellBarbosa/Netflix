import React from "react";
import styles from "./style.module.css";
import infoImg from "../../assets/information.svg";
import { GlobalContext } from "../../GlobalContext";
import { TvSeries } from "../../utils/model/TvSeries";

interface Args {
  tvSeries: TvSeries;
}

const FeaturedTvSeries = ({ tvSeries }: Args) => {
  const globalContext = React.useContext(GlobalContext);
  const voteAverage = String(tvSeries.vote_average.toFixed(1)).replace(".", "");
  const season = tvSeries.number_of_seasons > 1 ? "seasons" : "season";

  const openModal = () => {
    console.log(tvSeries)
    globalContext?.setType("tv");
    globalContext?.setId(tvSeries.id);
    globalContext?.setOpen(true);
  };

  return (
    <div
      className={styles.movieInfoImg}
      style={{
        background: `url('https://image.tmdb.org/t/p/original/${tvSeries.backdrop_path}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className={styles.verticalEffect}>
        <div className={styles.horizontalEffect}>
          <div className="container">
            <h1 className={styles.movieName}>{tvSeries.name}</h1>
            <div className={styles.infoWrapper}>
              <p className={styles.info}>{voteAverage}% Relevant</p>
              <p className={styles.info}>{tvSeries.first_air_date.slice(0, 4)}</p>
              <p className={styles.info}>
                {tvSeries.number_of_seasons + " " + season}
              </p>
            </div>
            <p className={styles.overview}>{tvSeries.overview}</p>
            <button className={styles.modalButton} onClick={openModal}>
              <img className={styles.infoImg} src={infoImg} alt="Informações" />
              Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTvSeries;
