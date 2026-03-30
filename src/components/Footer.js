import React from 'react';
import { FaGithub, FaHeart, FaLinkedin, FaRocket } from 'react-icons/fa';
import { useI18n } from '../i18n';

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="footer-section footer-left">
        <FaRocket /> {t('footer.portfolio')}
      </div>
      <div className="footer-section footer-center">
        <FaHeart /> {t('footer.thanks')}
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
