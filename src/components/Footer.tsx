import React from 'react';
import styles from './Footer.module.css';
import Github from '../assets/github.svg';
import Linkedin from '../assets/linkedin.svg';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerWrapper} container`}>
        <div>
          <a  className={styles.link} href="https://github.com/GabriellBarbosa">
            <img className={styles.linkImg} src={Github} alt="Github" />
          </a>
          <a className={styles.link} href="https://www.linkedin.com/in/gabriel-barbosa-57b87b18a/">
            <img className={styles.linkImg} src={Linkedin} alt="Linkedin" />
          </a>
        </div>
        <p>Thanks for the visit 👊</p>      
      </div>
    </footer>
  )
}

export default Footer
