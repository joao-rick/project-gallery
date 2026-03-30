import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n';

const skillSets = [
  { id: 'frontend', labelPt: 'Frontend', labelEn: 'Frontend' },
  { id: 'backend', labelPt: 'Backend', labelEn: 'Backend' },
  { id: 'design', labelPt: 'Design', labelEn: 'Design' },
  { id: 'data', labelPt: 'Dados', labelEn: 'Data' },
];

const portfolioProjects = [
  {
    id: 1,
    title: 'Atlas Finance',
    tag: 'frontend',
    descriptionPt: 'Dashboard responsivo com graficos em tempo real.',
    descriptionEn: 'Responsive dashboard with real-time charts.',
  },
  {
    id: 2,
    title: 'Roteiro Verde',
    tag: 'design',
    descriptionPt: 'Identidade visual e landing page para ONG.',
    descriptionEn: 'Visual identity and landing page for NGO.',
  },
  {
    id: 3,
    title: 'Fluxo Log',
    tag: 'backend',
    descriptionPt: 'API de rastreamento com filas e cache distribuido.',
    descriptionEn: 'Tracking API with queues and distributed cache.',
  },
  {
    id: 4,
    title: 'Insight Lab',
    tag: 'data',
    descriptionPt: 'Pipeline de dados para relatorios semanais.',
    descriptionEn: 'Data pipeline for weekly reports.',
  },
];

const PortfolioDemo = () => {
  const [activeSkill, setActiveSkill] = useState('frontend');
  const { locale, t } = useI18n();

  const visibleProjects = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag === activeSkill);
  }, [activeSkill]);

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>{t('demos.portfolioTitle')}</h2>
          <p>{t('demos.portfolioSubtitle')}</p>
        </div>
        <button type="button" className="demo-primary">
          {t('demos.downloadCv')}
        </button>
      </header>

      <section className="demo-hero">
        <h3>{t('demos.portfolioHeroTitle')}</h3>
        <p>{t('demos.portfolioHeroText')}</p>
      </section>

      <section className="demo-tabs">
        {skillSets.map((skill) => (
          <button
            key={skill.id}
            type="button"
            className={activeSkill === skill.id ? 'active' : ''}
            onClick={() => setActiveSkill(skill.id)}
          >
            {locale === 'en' ? skill.labelEn : skill.labelPt}
          </button>
        ))}
      </section>

      <section className="demo-grid">
        {visibleProjects.map((project) => (
          <article key={project.id} className="demo-card">
            <h3>{project.title}</h3>
            <p>{locale === 'en' ? project.descriptionEn : project.descriptionPt}</p>
            <button type="button">{t('demos.viewCase')}</button>
          </article>
        ))}
      </section>

      <section className="demo-panel">
        <h3>{t('demos.services')}</h3>
        <div className="demo-list">
          <div className="demo-list-row">
            <span>{t('demos.service1')}</span>
            <strong>{t('demos.service1Meta')}</strong>
          </div>
          <div className="demo-list-row">
            <span>{t('demos.service2')}</span>
            <strong>{t('demos.service2Meta')}</strong>
          </div>
          <div className="demo-list-row">
            <span>{t('demos.service3')}</span>
            <strong>{t('demos.service3Meta')}</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDemo;
