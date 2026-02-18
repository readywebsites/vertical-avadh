import React, { useEffect, useState } from 'react';
import styles from './MobileHeader.module.css';
import avadhLogo from "../../src/assets/images/logo/logo_01_trans.png";

const MobileHeader = ({ onMenuClick, isScrolled }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after a very short delay to ensure the component is in the DOM
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`${styles.mobileHeader} ${isScrolled ? styles.scrolled : ''} ${!isScrolled ? styles.onHero : ''}`}>
      <div className={styles.logoContainer}>
        <img src={avadhLogo} alt="Avadh Logo" className={styles.logo} />
      </div>
      <div className={`${styles.brandNameContainer} ${isLoaded ? styles.loaded : ''}`}>
        <span className={styles.brandName}>AVADH</span>
      </div>
      <div className={styles.menuContainer}>
        <button
          className={styles.hamburgerButton}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;