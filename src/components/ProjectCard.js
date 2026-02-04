import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const isInternal = project.link.startsWith('/');

  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div id='button-view'>
        {isInternal ? (
          <Link to={project.link}>
            Ver Projeto <FaArrowRight />
          </Link>
        ) : (
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            Ver Projeto <FaArrowRight />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
