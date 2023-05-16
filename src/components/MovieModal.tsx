import React from 'react';
import styles from './MovieModal.module.css';
import { GlobalContext } from '../GlobalContext';
import { pullData, api_key } from '../api';
import ReactPlayer from 'react-player';
import Close from '../assets/Close.svg';
import { Result } from './MovieList';

const MovieModal = () => {
  const movieContext = React.useContext(GlobalContext);  
  const [data, setData] = React.useState<Result | null>(null);
  const [video, setVideo] = React.useState<string>('');

  let voteAvarege;
  if (data) voteAvarege = String(data.vote_average.toFixed(1)).replace('.', '');
  const youtubeUrl = 'https://www.youtube.com/watch?v=';

  React.useEffect(() => {
    const pullInfo = async (theType: string) => {
      const { response, request } = await pullData(`${theType}/${movieContext?.id}?api_key=${api_key}`);
      if(request.ok) {
        setData(response);
      }
    }
    const pullVideo = async (theType: string) => {
      const { response, request } = await pullData(`${theType}/${movieContext?.id}/videos?api_key=${api_key}`);
      if(request.ok && response.results.length) {
        setVideo(`${youtubeUrl}${response.results[0].key}`);
      }
    }
    switch(movieContext?.type) {
      case 'all':
        if(movieContext?.mediaType === 'movie' && movieContext?.open) {
          pullInfo('movie');
          pullVideo('movie');
        } else {
          pullInfo('tv');
          pullVideo('tv');
        }
        break;
      case 'movie':
        if(movieContext?.open) {
          pullInfo('movie');
          pullVideo('movie');
        }

        break;
      case 'tv':
        if(movieContext?.open) {
          pullInfo('tv');
          pullVideo('tv');
        }
        break;
      default:
        if(movieContext?.open) {
          pullInfo('movie');
          pullVideo('movie');
        }

    }
  }, [movieContext?.id, movieContext?.mediaType, movieContext?.type, movieContext?.open]);

  const reset = () => {
    movieContext?.setOpen(false);
    setVideo('');
    setData(null);
  }
  const handleClick = () => {
    reset();
  }
  const clickOutSide = ({ currentTarget, target }: React.MouseEvent<HTMLElement>) => {
    if (target === currentTarget) {
      reset();
    }
  }

  if(!movieContext?.open || !data) return null
  return (
    <div className={styles.modalWrapper} onClick={clickOutSide}>
      <div className={`${styles.modal} modalAnimation`}>
        <button onClick={handleClick} className={styles.close}>
          <img src={Close} alt="Close" />
        </button>
        {video 
        ? <div><ReactPlayer className={styles.video} controls url={video} width="100%" ></ReactPlayer></div>
        : <div className={styles.modalImg} style={{
          background: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        }}
        ></div>
        }
        <div className={styles.movieInfo}>
          <h3 className={styles.title}>{data.title || data.name}</h3>
          <div className={styles.voteAndRelease}>
            <p className="voteAvarege">{voteAvarege}% Relevant</p>
            <p className={styles.release}>
              {data.release_date 
                ? data.release_date.slice(0, 4) 
                : data.first_air_date.slice(0, 4)
              }
            </p>
            {data.number_of_seasons && (
              <div>
                {data.number_of_seasons === 1 
                ? <p className="numberOfSeasons">{data.number_of_seasons} season</p>
                : <p className="numberOfSeasons">{data.number_of_seasons} seasons</p>
                }
              </div>
            )
            }
          </div>
          <p className={styles.overview}>{data.overview}</p> 
        </div>
      </div>
    </div>
  )
}

export default MovieModal
