import React from 'react'
import MovieList from '../MovieList';
import styles from './style.module.css';
import leftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'
import { Media } from '../../utils/model/Media';
import { translateX } from '../../utils/function/translateX';

const Movie = ({ item }: { item: Media }) => {
  const movieList = React.useRef<HTMLDivElement>(null);
  const halfScreenWidth = window.innerWidth / 2;

  function slideLeft() {
    const element = movieListElement();
    if (element) {
      const currentTranslateX = translateX(element.style.transform);
      const newTranslateX = halfScreenWidth + currentTranslateX;
      const result = newTranslateX > 0 ? 0 : newTranslateX;
      element.style.transform = `translate3d(${result}px, 0, 0)`;
    }
  }

  function slideRight() {
    const element = movieListElement();
    if (element) {
      const currentTranslateX = translateX(element.style.transform);
      const maxTranslateX = getMaxTranslateX();
      const newTranslateX = halfScreenWidth - currentTranslateX;
      const result = newTranslateX > maxTranslateX ? maxTranslateX : newTranslateX;
      element.style.transform = `translate3d(${-(result)}px, 0, 0)`;
    }
  }

  function movieListElement() {
    return movieList.current;
  }

  function getMaxTranslateX() {
    const CARD_WIDTH = 302;
    const MOVIE_LIST_PADDING = 60;
    const numberOfMedias = item.items.response.results.length;
    return ((numberOfMedias * CARD_WIDTH) + MOVIE_LIST_PADDING) - window.innerWidth;
  }
  
  return (
    <section className={`${styles.movieSection} containerMovies`}>
      <p className={styles.sectionTitle}>{item.title}</p>
      <button className={styles.slideBtn__left} onClick={slideLeft} data-testid="slideLeft">
        <img className={styles.arrowLeft_img} src={leftArrow} alt="arrow to left" />
      </button>
      <button className={styles.slideBtn__right} onClick={slideRight} data-testid="slideRight">
        <img className={styles.arrowRight_img} src={RightArrow} alt="arrow to right" />
      </button>
      <div ref={movieList} className={styles.movieList} data-testid="movieList">
        {item.items.response.results.map((result) => (
          <MovieList key={result.id} result={result} type={item.type} />
        ))}        
      </div>
    </section>
  )
}

export default Movie
