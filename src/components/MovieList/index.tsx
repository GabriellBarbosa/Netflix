import React from 'react';
import styles from './style.module.css';
import Play from '../../assets/Play.svg';
import Like from '../../assets/Like.svg';
import AddToList from '../../assets/Plus.svg';
import DownArrow from '../../assets/down-arrow.svg';

import { GlobalContext } from '../../GlobalContext';
import { Movie } from '../../utils/model/Movie';
import { TvSeries } from '../../utils/model/TvSeries';

export interface Result {
  id: number;
  name: string;
  title: string;
  overview: string;
  media_type: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  number_of_seasons: number;
  release_date: string;
  first_air_date: string;
}

const MovieList = ({result, type}: { result: TvSeries | Movie, type: string }) => {
const movieContext = React.useContext(GlobalContext);
// const {setId, setOpen, setType, setMediaType} = movieContext;
const context = movieContext;

const container = React.useRef<HTMLDivElement>(null);
const voteAverage = `${String(result.vote_average.toFixed(1)).replace('.', '')}%`;
const urlImage = 'https://image.tmdb.org/t/p/w300/';


const movieTitle = () => {
  if ((result as TvSeries)?.name) {
    return (result as TvSeries).name;
  } else if ((result as Movie)?.title) {
    return (result as Movie).title
  } else {
    return '';
  }
}

// adiciona a classe hover quando o mouse está em cima do elemento
const mouseHover = () => {
  const element = container.current;
  if (element) {
    element.classList.add(styles.hover);
  }
}
// remove a classe hover quando o mouse sai de cima do elemento
const mouseLeave = () => {
  const element = container.current;
  if (element) {
    element.classList.remove(styles.hover);
  }
}

const handleClick = () => {
  context?.setType(type);
  context?.setId(result.id);
  context?.setOpen(true);
}
  return (
    <div onMouseLeave={mouseLeave} ref={container} className={styles.movieWrapper}>
      <div className={styles.movieImgWrapper}>
        <img className={styles.movieImg} onMouseOver={mouseHover} src={`${urlImage}${result.backdrop_path || result.poster_path}`} alt={movieTitle()} />
        <div className={styles.infoHoverImg} onClick={handleClick}></div>
      </div>
      <div className={styles.movieInfoWrapper}>
        <div className={styles.btnsWrapper}>
          <div>
            <button disabled className={styles.movieButton} ><img src={Play}  alt="Watch"/></button>
            <button disabled className={styles.movieButton} ><img src={AddToList}  alt="Add to my list"/></button>
            <button disabled className={styles.movieButton} ><img src={Like}  alt="like"/></button>
            <button disabled className={styles.movieButton} ><img src={Like}  alt="unlike"/></button>            
          </div>
          <div className={styles.movieButtonInfo} onClick={handleClick}><img src={DownArrow}  alt="More info"/></div>
        </div>
        <div>
          <p className={styles.movieName}>{movieTitle()}</p>
          <p className={styles.voteAverage}>
            <span className={styles.voteAverageNumber}>
              {voteAverage} relevant
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieList
