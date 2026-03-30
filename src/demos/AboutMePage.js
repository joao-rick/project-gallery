import React from 'react';
import {
  FaBolt,
  FaCode,
  FaDatabase,
  FaLayerGroup,
  FaPaintBrush,
} from 'react-icons/fa';
import profileImage from '../img/perfil.jpg';
import { useI18n } from '../i18n';

const AboutMePage = () => {
  const { t } = useI18n();

  return (
    <div className="demo-page about-page">
      <header className="demo-header about-header">
        <div>
          <h2>{t('about.title')}</h2>
        </div>
      </header>

      <section className="about-hero">
        <div className="about-badge">
          <span className="about-pill">
            <FaBolt /> {t('about.available')}
          </span>
          <h3>{t('about.hello')}</h3>
          <p>{t('about.summary')}</p>
          <div className="about-tags">
            <span>
              <FaLayerGroup /> {t('about.tagProduct')}
            </span>
            <span>
              <FaCode /> {t('about.tagFrontend')}
            </span>
            <span>
              <FaDatabase /> {t('about.tagBackend')}
            </span>
          </div>
        </div>
        <div className="about-photo">
          <img src={profileImage} alt="Developer profile" />
        </div>
      </section>

      <section className="about-highlight">
        <div>
          <h4>{t('about.driveTitle')}</h4>
          <p>{t('about.driveText')}</p>
        </div>
        <div>
          <h4>{t('about.workTitle')}</h4>
          <p>{t('about.workText')}</p>
        </div>
      </section>

      <section className="demo-panel">
        <h3>{t('about.hardSkills')}</h3>
        <div className="demo-list">
          <div className="demo-list-row">
            <span>
              <FaCode /> {t('about.languages')}
            </span>
            <strong>TypeScript, JavaScript, Python, C#, Java.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaDatabase /> {t('about.backend')}
            </span>
            <strong>Node.js (Express.js, NestJS), Django, Spring.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaPaintBrush /> {t('about.frontend')}
            </span>
            <strong>React, Tailwind CSS, Next.js.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaLayerGroup /> {t('about.apis')}
            </span>
            <strong>REST APIs, GraphQL.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaDatabase /> {t('about.database')}
            </span>
            <strong>PostgreSQL, MySQL, SQL Server, Redis, MongoDB.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaBolt /> {t('about.containers')}
            </span>
            <strong>Docker, Kubernetes.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaLayerGroup /> {t('about.vcs')}
            </span>
            <strong>Git, GitHub, GitLab.</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMePage;
