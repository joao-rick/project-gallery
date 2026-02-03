import React from 'react';
import ProjectCard from './ProjectCard';
import projects from '../projects';

const ProjectGallery = () => {
  return (
    <div className="project-gallery">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGallery;
