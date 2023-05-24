import React from 'react'
import styles from './style.module.css';
import Search from '../../assets/Search.svg';
import Gift from '../../assets/Gift.svg';
import Notification from '../../assets/Notification.svg';
import User from '../../assets/User.png';
import Logo from '../../assets/logo-mobile.png';

const Header = () => {
  const headerElement = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const changeBackgroundColor = () => {
      if (headerElement.current) {
        if (window.scrollY > 60) {
          headerElement.current.classList.add(styles.active);
        } else {
          headerElement.current.classList.remove(styles.active);
        }
      }
    }

    window.addEventListener('scroll', changeBackgroundColor);
    return () => {
      window.removeEventListener('scroll', changeBackgroundColor);
    }
  }, []);

  return (
    <header ref={headerElement} className={styles.header} data-testid="header">
      <div className={`${styles.headerContent} container`}>
        <div className={styles.logoAndNav_wrapper}>
          <img 
            className={styles.logo} 
            src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg' 
            alt='Netflix Logo' 
          />
          <img 
            className={styles.logoMobile} 
            src={Logo} 
            alt='Netflix Logo' 
          />
          <nav className={styles.menuNav}>
            <ul className={styles.navList}>
              <li>Home</li>
              <li>Series</li>
              <li>Movies</li>
              <li>Trending</li>
              <li>My list</li>
            </ul>
          </nav>
        </div>
        <ul className={styles.navMobile}>
          <li>Series</li>
          <li>Movies</li>
          <li>My List</li>
        </ul>
        <ul className={styles.userWrapper}>
          <li><img className={styles.doAction}  src={Search} alt="Search" /></li>
          <li className={styles.kids}>KIDS</li>
          <li><img className={styles.doAction} src={Gift} alt="Gift" /></li>
          <li><img className={styles.doAction} src={Notification} alt="Notification" /></li>
          <li><img className={styles.userImg} src={User} alt="User" /></li>
        </ul>
      </div>
    </header>
  )
}

export default Header;
