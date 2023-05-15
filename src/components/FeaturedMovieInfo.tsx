import React from 'react'
import styles from './FeaturedMovieInfo.module.css';
import infoImg from '../assets/information.svg'
import { GlobalContext } from '../GlobalContext';

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
  const tvContext = React.useContext(GlobalContext);
  // const {setId, setOpen, setType} = tvContext;
  const context = tvContext;

  const voteAverage = String(featured.vote_average.toFixed(1)).replace('.', '');
  
  const handleClick = () => {
    context?.setType('tv');
    context?.setId(featured.id);
    context?.setOpen(true);
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
            <h1 className={styles.movieName}>{featured.name}</h1>
            <div className={styles.serieInfo}>
              <p className={styles.serieInfoItem}>{voteAverage}% Relevant</p>
              <p className={styles.serieInfoItem}>{featured.first_air_date.slice(0, 4)}</p>
              <p className={styles.serieInfoItem}>
                {
                  featured.number_of_seasons > 1 
                  ? `${featured.number_of_seasons} seasons `
                  : ` ${featured.number_of_seasons} season`
                }
              </p>
            </div>
            <p className={styles.overview}>{featured.overview}</p>
            <div className={styles.buttonWrapper}>
              <button disabled className={`${styles.callToAction}`}>+ My list</button>
              <button disabled className={styles.callToAction}>► Watch</button>
              <button className={styles.callToAction} onClick={handleClick}>
                <img className={styles.infoImg} src={infoImg} alt="I" />More info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedMovieInfo
