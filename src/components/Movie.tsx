import React from 'react'
import MovieList, { Result } from './MovieList';
import styles from './Movie.module.css';
import leftArrow from '../assets/left-arrow.svg'
import RightArrow from '../assets/right-arrow.svg'

interface Item {
  title: string;
  type: string;
  items: {
    response: {
      results: Result[]
    }
  }
}

const Movie= ({item}: { item: Item }) => {
  const movieList = React.useRef<HTMLDivElement>(null);

  // Pega o valor do translateX da lista de filmes. Se não
  // tiver translateX definido o translateX recebe 0
  const scrollConfig = () => {
    const element = movieList.current;
    if (element) {
      const halfScreenWidth = window.innerWidth / 2;
      const style = window.getComputedStyle(element);
      const matrix = style.transform;
      const translateX = matrix.replace('matrix', '').replace('(', '').replace(')', '').split(', ')[4] || 0;
      return {
        element, 
        halfScreenWidth, 
        translateX
      }
    } else {
      return null;
    }
  }
  const scrollLeft = () => {
    const scroll = scrollConfig();
    if (scroll) {
      const { element, halfScreenWidth, translateX } = scroll;
      // se o valor do movimento for maior do que 0
      // a lista não irá mais para a esquerda
      let slide = (halfScreenWidth + Number(translateX)) > 0 
        ? 0 
        : (halfScreenWidth + Number(translateX));
      element.style.transform = `translateX(${slide}px)`
    }
  }

  const scrollRight = () => {
    const scroll = scrollConfig();
    if (scroll) {
      const listWidth = item.items.response.results.length * 302 - window.innerWidth + 60;
      const { element, halfScreenWidth, translateX } = scroll;
      // se o valor do movimento + o translateX for maior do que
      // que a largura do lista, a lista não irá mais para a direita
      let slide = -(halfScreenWidth - Number(translateX)) < -listWidth 
        ? -listWidth 
        : -(halfScreenWidth - Number(translateX));
      element.style.transform = `translate3d(${slide}px, 0, 0)`;
    }
  }
  
  return (
    <section className={`${styles.movieSection} containerMovies`}>
      <p className={styles.sectionTitle}>{item.title}</p>
      <button className={styles.slideBtn__left} onClick={scrollLeft}>
        <img className={styles.arrowLeft_img} src={leftArrow} alt="arrow to left" />
      </button>
      <button className={styles.slideBtn__right} onClick={scrollRight}>
        <img className={styles.arrowRight_img} src={RightArrow} alt="arrow to right" />
      </button>
      <div ref={movieList} className={styles.movieList}>
        {item.items.response.results.map((result) => (
          <MovieList key={result.id} result={result} type={item.type} />
        ))}        
      </div>

    </section>
  )
}

export default Movie
