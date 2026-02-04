import React from 'react';
import { FaGithub, FaHeart, FaLinkedin, FaRocket } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-section footer-left">
        <FaRocket /> Portfólio pessoal
      </div>
      <div className="footer-section footer-center">
        <FaHeart /> Obrigado por visitar
      </div>
      <div className="footer-section footer-right footer-links">
        <a href="https://github.com/joao-rick" target="_blank" rel="noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href="https://linkedin.com/in/joao-ric/" target="_blank" rel="noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
