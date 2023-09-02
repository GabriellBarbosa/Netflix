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
      const halfScreenWidth = halfScreenWidthxxx();
      return {
        element, 
        halfScreenWidth, 
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
      const newTranslateX = halfScreenWidthxxx() + translateX;
      let slide = newTranslateX > 0 ? 0 : newTranslateX;
      element.style.transform = `translate3d(${slide}px, 0, 0)`
    }
  }

  const scrollRight = () => {
    const scroll = scrollConfig();
    if (scroll) {
      /*
      list total width
      screen width
      
      magic numbers: 
        302 = card width; 
        60  = padding in container;
      */
      /* 
      list if i put the whole list width i will be out of screen thats why i put - innerWidth
      maxTranslateX
     */
      const listWidth = item.items.response.results.length * 302 - window.innerWidth + 60;
      const { element, translateX } = scroll;
      // se o valor do movimento + o translateX for maior do que
      // que a largura do lista, a lista não irá mais para a direita
      let slide = -(halfScreenWidthxxx() - Number(translateX)) < -listWidth 
        ? -listWidth 
        : -(halfScreenWidthxxx() - Number(translateX));
      element.style.transform = `translate3d(${slide}px, 0, 0)`;
    }
  }

  function halfScreenWidthxxx() {
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
