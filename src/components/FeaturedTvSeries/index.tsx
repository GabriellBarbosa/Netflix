import React from "react";
import styles from "./style.module.css";
import infoImg from "../../assets/information.svg";
import { GlobalContext } from "../../GlobalContext";
import { TvSeries } from "../../utils/model/TvSeries";

interface Args {
  aTvSeries: TvSeries;
}

const FeaturedTvSeries = ({ aTvSeries }: Args) => {
  const globalContext = React.useContext(GlobalContext);
  const voteAverage = String(aTvSeries.vote_average.toFixed(1)).replace(".", "");
  const season = aTvSeries.number_of_seasons > 1 ? "seasons" : "season";
  console.log(voteAverage)
  const openModal = () => {
    globalContext?.setType("tv");
    globalContext?.setId(aTvSeries.id);
    globalContext?.setOpen(true);
  };

  return (
    <div 
      className={styles.banner} 
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${aTvSeries.backdrop_path}')`,
      }}
    >
      <div className={styles.verticalEffect}>
        <div className={styles.horizontalEffect}>
          <div className="container">
            <h1 className={styles.title}>{aTvSeries.name}</h1>
            <div className={styles.infoWrapper}>
              <p className={styles.info} data-testid="voteAverage">{voteAverage}% Relevant</p>
              <p className={styles.info}>{aTvSeries.first_air_date.slice(0, 4)}</p>
              <p className={styles.info}>
                {aTvSeries.number_of_seasons + " " + season}
              </p>
            </div>
            <p className={styles.overview}>{aTvSeries.overview}</p>
            <button className={styles.modalButton} onClick={openModal}>
              <img className={styles.infoImg} src={infoImg} alt="Info" />
              Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTvSeries;
