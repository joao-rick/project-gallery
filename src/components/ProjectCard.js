import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useI18n } from '../i18n';

const ProjectCard = ({ project }) => {
  const isInternal = project.link.startsWith('/');
  const { t } = useI18n();

  return (
    <div className="project-card">
      <img src={project.image} alt={t(project.titleKey)} />
      <h3>{t(project.titleKey)}</h3>
      <p>{t(project.descriptionKey)}</p>
      <div className="project-card-action">
        {isInternal ? (
          <Link to={project.link}>
            {t('projectCard.open')} <FaArrowRight />
          </Link>
        ) : (
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {t('projectCard.open')} <FaArrowRight />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
