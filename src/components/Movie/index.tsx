import React from 'react'
import MovieList, { Result } from '../MovieList';
import styles from './style.module.css';
import leftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'
import { Item } from '../Home';
import { Media } from '../../utils/model/Media';
import { translateX } from '../../utils/function/translateX';

const Movie= ({ item }: { item: Media }) => {
  const movieList = React.useRef<HTMLDivElement>(null);
  // Pega o valor do translateX da lista de filmes. Se não
  // tiver translateX definido o translateX recebe 0
  const scrollConfig = () => {
    const element = movieList.current;
    if (element) {
      return {
        element, 
        translateX: translateX(element.style.transform)
      }
    } else {
      return null;
    }
  }

  const scrollLeft = () => {
    const scroll = scrollConfig();
    if (scroll) {
      const { element, translateX } = scroll;
      const newTranslateX = halfScreenWidth() + translateX;
      let slide = newTranslateX > 0 ? 0 : newTranslateX;
      element.style.transform = `translate3d(${slide}px, 0, 0)`
    }
  }

  const scrollRight = () => {
    const scroll = scrollConfig();
    if (scroll) {
      const { element, translateX } = scroll;
      const maxTranslateX = getMaxTranslateX();
      const newTranslateX = halfScreenWidth() - translateX;
      const result = newTranslateX > maxTranslateX ? maxTranslateX : newTranslateX;
      element.style.transform = `translate3d(${-(result)}px, 0, 0)`;
    }
  }

  function getMaxTranslateX() {
    const CARD_WIDTH = 302;
    const MOVIE_LIST_PADDING = 60;
    const numberOfMedias = item.items.response.results.length;
    return ((numberOfMedias * CARD_WIDTH) + MOVIE_LIST_PADDING) - window.innerWidth;
  }

  function halfScreenWidth() {
    return window.innerWidth / 2;
  }
  
  return (
    <section className={`${styles.movieSection} containerMovies`}>
      <p className={styles.sectionTitle}>{item.title}</p>
      <button className={styles.slideBtn__left} onClick={scrollLeft} data-testid="slideLeft">
        <img className={styles.arrowLeft_img} src={leftArrow} alt="arrow to left" />
      </button>
      <button className={styles.slideBtn__right} onClick={scrollRight} data-testid="slideRight">
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
