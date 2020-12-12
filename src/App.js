import React from 'react';
import './App.css';
import { movieList, api_key, pullData } from './api';
import { MovieContext } from './GlobalContext';

// componentes
import Home from './components/Home';
import FeaturedMovieInfo from './components/FeaturedMovieInfo';
import MovieModal from './components/MovieModal';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  const [data, setData] = React.useState();
  const [featured, setFeatured] = React.useState();
  React.useEffect(() => {
    const {api} = movieList;
    const pullMovieList = async () => {
      const list = await api();
      setData(list);
      pullFeaturedMovie(list);
    }
    pullMovieList();
    
    // escolhe uma série aleatóriamente da segunda lista
    // puxada anteriormente
    const pullFeaturedMovie = async (list) => {
      const randomNumber = Math.round(Math.random() * 20);
      const tvSerieList = list[1].items.response.results;
      const choseMovieId = tvSerieList[randomNumber].id;
      const endpoint = `tv/${choseMovieId}?api_key=${api_key}&language=en-US`;
      const { response } = await pullData(endpoint);
      setFeatured(response);
    }
  }, []);

  if (!data || !featured) return <Loading />
  return (
    <>
      <MovieContext>
        <div className="fadeIn">
          <Header />   
          <FeaturedMovieInfo featured={featured} />
          <Home data={data} />
          <MovieModal />
          <Footer />
        </div>
      </MovieContext>
    </>
  )
}

export default App
