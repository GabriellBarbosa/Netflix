import React from 'react'
import styles from './style.module.css';
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
      <div className={`${styles.wrapper} container`}>
        <img 
          className={styles.logoDesktop} 
          src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg' 
          alt='Netflix Logo' 
        />
        <img 
          className={styles.logoMobile} 
          src={Logo} 
          alt='Netflix Logo' 
        />
      </div>
    </header>
  )
}

export default Header;
