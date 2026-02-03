import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div id='button-view'>
        <a href={project.link} target="_blank" rel="noopener noreferrer">Ver Projeto</a>
      </div>
    </div>
  );
};

export default ProjectCard;
