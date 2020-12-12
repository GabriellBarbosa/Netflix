import React from 'react'
import MovieList from './MovieList';
import styles from './Movie.module.css';
import leftArrow from '../assets/left-arrow.svg'
import RightArrow from '../assets/right-arrow.svg'


const Movie= ({item}) => {
  const movieList = React.useRef();

  // Pega o valor do translateX da lista de filmes. Se não
  // tiver translateX definido o translateX recebe 0
  const scrollConfig = () => {
    const element = movieList.current;
    const halfScreenWidth = window.innerWidth / 2;
    const style = window.getComputedStyle(element);
    const matrix = style.transform;
    const translateX = matrix.replace('matrix', '').replace('(', '').replace(')', '').split(', ')[4] || 0;

    return {
      element, 
      halfScreenWidth, 
      translateX
    }
  }
  const scrollLeft = () => {
    const { element, halfScreenWidth, translateX } = scrollConfig();
    // se o valor do movimento for maior do que 0
    // a lista não irá mais para a esquerda
    let slide = (halfScreenWidth + Number(translateX)) > 0 
      ? 0 
      : (halfScreenWidth + Number(translateX));
    element.style.transform = `translateX(${slide}px)`
  }

  const scrollRight = () => {
    const { element, halfScreenWidth, translateX } = scrollConfig();
    const listWidth = item.items.response.results.length * 302 - window.innerWidth + 60;
    // se o valor do movimento + o translateX for maior do que
    // que a largura do lista, a lista não irá mais para a direita
    let slide = -(halfScreenWidth - Number(translateX)) < -listWidth 
      ? -listWidth 
      : -(halfScreenWidth - Number(translateX));
    element.style.transform = `translate3d(${slide}px, 0, 0)`;
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
