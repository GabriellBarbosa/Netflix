import React from 'react';
import styles from './MovieModal.module.css';
import { GlobalContext } from '../GlobalContext';
import { pullData, api_key } from '../api';
import ReactPlayer from 'react-player';
import Close from '../assets/Close.svg';

const MovieModal = () => {
  const movieContext = React.useContext(GlobalContext);  
  const { mediaType, type, id, setOpen, open } = movieContext;
  const [data, setData] = React.useState();
  const [video, setVideo] = React.useState();

  let voteAvarege;
  if (data) voteAvarege = String(data.vote_average.toFixed(1)).replace('.', '');
  const youtubeUrl = 'https://www.youtube.com/watch?v=';

  React.useEffect(() => {
    const pullInfo = async (theType) => {
      const { response, request } = await pullData(`${theType}/${id}?api_key=${api_key}`);
      if(request.ok) {
        setData(response);
      }
    }
    const pullVideo = async (theType) => {
      const { response, request } = await pullData(`${theType}/${id}/videos?api_key=${api_key}`);
      if(request.ok && response.results.length) {
        setVideo(`${youtubeUrl}${response.results[0].key}`);
      }
    }
    switch(type) {
      case 'all':
        if(mediaType === 'movie' && open) {
          pullInfo('movie');
          pullVideo('movie');
        } else {
          pullInfo('tv');
          pullVideo('tv');
        }
        break;
      case 'movie':
        if(open) {
          pullInfo('movie');
          pullVideo('movie');
        }

        break;
      case 'tv':
        if(open) {
          pullInfo('tv');
          pullVideo('tv');
        }
        break;
      default:
        if(open) {
          pullInfo('movie');
          pullVideo('movie');
        }

    }
  }, [id, mediaType, type, open]);

  const reset = () => {
    setOpen(false);
    setVideo(null);
    setData(null);
  }
  const handleClick = () => {
    reset();
  }
  const clickOutSide = ({ currentTarget, target }) => {
    if (target === currentTarget) {
      reset();
    }
  }

  if(!open || !data) return null
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
            {data.number_of_seasons === true}
          </div>
          <p className={styles.overview}>{data.overview}</p> 
        </div>
      </div>
    </div>
  )
}

export default MovieModal
