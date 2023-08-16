import React from 'react'
import styles from './style.module.css';
import infoImg from '../../assets/information.svg'
import { GlobalContext } from '../../GlobalContext';

interface FeaturedMovie {
  id: string;
  name: string;
  first_air_date: string;
  overview: string;
  backdrop_path: string;
  number_of_seasons: number;
  vote_average: number;
}

const FeaturedMovieInfo = ({ featured }: { featured: FeaturedMovie }) => {
  const globalContext = React.useContext(GlobalContext);
  const voteAverage = String(featured.vote_average.toFixed(1)).replace('.', '');
  const season = featured.number_of_seasons > 1 ? 'seasons' : 'season';

  const openModal = () => {
    globalContext?.setType('tv');
    globalContext?.setId(featured.id);
    globalContext?.setOpen(true);
  }

  return (
    <div className={styles.movieInfoImg} style={
      {
        background: `url('https://image.tmdb.org/t/p/original/${featured.backdrop_path}')`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        width: '100%', 
        height: '100vh'
      }
    }>
      <div className={styles.verticalEffect}>
        <div className={styles.horizontalEffect}>
          <div className="container">
            <h1 className={styles.movieName}>{ featured.name }</h1>
            <div className={styles.infoWrapper}>
              <p className={styles.info}>{ voteAverage }% Relevant</p>
              <p className={styles.info}>{ featured.first_air_date.slice(0, 4) }</p>
              <p className={styles.info}>{ featured.number_of_seasons + ' ' + season }</p>
            </div>
            <p className={styles.overview}>{featured.overview}</p>
            <button className={styles.modalButton} onClick={openModal}>
              <img className={styles.infoImg} src={infoImg} alt="Informações" />Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedMovieInfo
