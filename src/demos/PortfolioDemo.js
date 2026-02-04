import React, { useMemo, useState } from 'react';

const skillSets = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'design', label: 'Design' },
  { id: 'data', label: 'Dados' },
];

const portfolioProjects = [
  {
    id: 1,
    title: 'Atlas Finance',
    tag: 'frontend',
    description: 'Dashboard responsivo com gráficos em tempo real.',
  },
  {
    id: 2,
    title: 'Roteiro Verde',
    tag: 'design',
    description: 'Identidade visual e landing page para ONG.',
  },
  {
    id: 3,
    title: 'Fluxo Log',
    tag: 'backend',
    description: 'API de rastreamento com filas e cache distribuído.',
  },
  {
    id: 4,
    title: 'Insight Lab',
    tag: 'data',
    description: 'Pipeline de dados para relatórios semanais.',
  },
];

const PortfolioDemo = () => {
  const [activeSkill, setActiveSkill] = useState('frontend');

  const visibleProjects = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag === activeSkill);
  }, [activeSkill]);

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Portfólio</h2>
          <p>Projetos, habilidades e propostas de valor.</p>
        </div>
        <button type="button" className="demo-primary">
          Baixar CV
        </button>
      </header>

      <section className="demo-hero">
        <h3>Olá, sou Alex Ribeiro</h3>
        <p>
          Desenvolvedor full-stack com foco em experiências digitais rápidas,
          acessíveis e com design consistente.
        </p>
      </section>

      <section className="demo-tabs">
        {skillSets.map((skill) => (
          <button
            key={skill.id}
            type="button"
            className={activeSkill === skill.id ? 'active' : ''}
            onClick={() => setActiveSkill(skill.id)}
          >
            {skill.label}
          </button>
        ))}
      </section>

      <section className="demo-grid">
        {visibleProjects.map((project) => (
          <article key={project.id} className="demo-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button type="button">Ver case</button>
          </article>
        ))}
      </section>

      <section className="demo-panel">
        <h3>Serviços</h3>
        <div className="demo-list">
          <div className="demo-list-row">
            <span>Landing pages rápidas</span>
            <strong>Entrega em 7 dias</strong>
          </div>
          <div className="demo-list-row">
            <span>Design system consistente</span>
            <strong>Componentes reutilizáveis</strong>
          </div>
          <div className="demo-list-row">
            <span>Suporte pós-lançamento</span>
            <strong>Monitoramento contínuo</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDemo;
