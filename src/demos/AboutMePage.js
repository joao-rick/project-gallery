import React from 'react';
import {
  FaBolt,
  FaCode,
  FaDatabase,
  FaLayerGroup,
  FaPaintBrush,
} from 'react-icons/fa';
import profileImage from '../img/perfil.jpg';

const AboutMePage = () => {
  return (
    <div className="demo-page about-page">
      <header className="demo-header about-header">
        <div>
          <h2>Sobre mim</h2>
          {/* <p>Desenvolvedor Full-Stack</p> */}
        </div>
      </header>

      <section className="about-hero">
        <div className="about-badge">
          <span className="about-pill">
            <FaBolt /> Disponível para contato
          </span>
          <h3>Olá, eu sou João Ricardo</h3>
          <p>
            Sou um desenvolvedor Full-Stack e entusiasta de programação e tecnologia, sempre em busca de evoluir e aprender. Gosto de criar projetos práticos, organizados e com foco em resultados.
          </p>
          <div className="about-tags">
            <span>
              <FaLayerGroup /> Produto
            </span>
            <span>
              <FaCode /> Front-end
            </span>
            <span>
              <FaDatabase /> Back-end
            </span>
          </div>
        </div>
        <div className="about-photo">
          <img src={profileImage} alt="Pessoa desenvolvedora" />
        </div>
      </section>

      <section className="about-highlight">
        <div>
          <h4>O que me move</h4>
          <p>
            Entregar produtos que unem clareza, fluidez e crescimento de
            negócio, com um cuidado especial em cada detalhe da interface.
          </p>
        </div>
        <div>
          <h4>Como eu trabalho</h4>
          <p>
            Processos ágeis, validação contínua com usuários e código limpo
            orientado a resultados.
          </p>
        </div>
      </section>

      <section className="demo-panel">
        <h3>Hard skills</h3>
        <div className="demo-list">
          <div className="demo-list-row">
            <span>
              <FaCode /> Linguagens de Programação
            </span>
            <strong>
              TypeScript, JavaScript, Python, C#, Java.
            </strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaDatabase /> Back-end
            </span>
            <strong>
              Node.js (Express.js, NestJS), Django, Spring.
            </strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaPaintBrush /> Front-end
            </span>
            <strong>
              React, Tailwind CSS, Next.js.
            </strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaLayerGroup /> APIs & Microsserviços
            </span>
            <strong>APIs RESTful, GraphQL.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaDatabase /> Banco de Dados
            </span>
            <strong>
              PostgreSQL, MySQL, SQL Server, Redis, MongoDB.
            </strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaBolt /> Containerização
            </span>
            <strong>Docker, Kubernetes.</strong>
          </div>
          <div className="demo-list-row">
            <span>
              <FaLayerGroup /> Controle de Versão
            </span>
            <strong>Git, GitHub, GitLab.</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMePage;
