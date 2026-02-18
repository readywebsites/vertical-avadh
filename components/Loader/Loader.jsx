import React from 'react';
import avadhLogo from '../../src/assets/images/logo/logo_01_trans.png';

const Loader = ({ isLoaded }) => {
  return (
    <div id="loader-overlay" className={`loader-overlay ${isLoaded ? 'hidden' : ''}`}>
      <div className="loader-content">
        <img src={avadhLogo} alt="Avadh Group Logo" className="loader-logo" />
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default Loader;