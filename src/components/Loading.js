import React from 'react';
import styles from './Loading.module.css';
const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <img
      className={styles.loadingImg} 
      src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" 
      alt="Logo da Netflix" 
      />
      <div className={styles.circlesWrapper}>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
      </div>
    </div>
  )
}

export default Loading
