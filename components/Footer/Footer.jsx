import React from 'react';
import avadhLogo from '../../src/assets/images/logo/logo_01_trans.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={avadhLogo} alt="Avadh Group Logo" className="footer-logo" loading="lazy" />
          <p>Crafting landmarks that redefine skylines. Avadh Group is synonymous with luxury, innovation, and trust in the real estate sector.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#chapter-1">Home</a></li>
            <li><a href="#chapter-3">Residential</a></li>
            <li><a href="#chapter-4">Commercial</a></li>
            <li><a href="#chapter-5">Lifestyle Club</a></li>
            <li><a href="#chapter-6">About Us</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            <span>601, IBC, Near Sunshine Global Hospital, Dumas Road, Piplod, Surat, Gujarat – 395007, India</span>
          </p>
          <p>
            <i className="fas fa-phone-alt"></i>
            <span>0261 – 400 2800 / 2900</span>
          </p>
          <p>
            <i className="fas fa-envelope"></i>
            <span>info@avadhprojects.com</span>
          </p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Avadh Group. All Rights Reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></p>
      </div>
    </footer>
  );
};

export default Footer;