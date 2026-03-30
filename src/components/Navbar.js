import React, { useState } from 'react';
import {
  FaBars,
  FaEnvelope,
  FaProjectDiagram,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import LanguageListbox from './LanguageListbox';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          {t('nav.logo')}
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenu}>
              <FaUser /> {t('nav.about')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-links" onClick={closeMenu}>
              <FaProjectDiagram /> {t('nav.projects')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={closeMenu}>
              <FaEnvelope /> {t('nav.contact')}
            </Link>
          </li>
          <li className="nav-item nav-locale">
            <LanguageListbox />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
