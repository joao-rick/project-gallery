import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mmrrricardo@gmail.com');
      setCopyStatus('Email copiado!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('Não foi possível copiar.');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  return (
    <div className="demo-page contact-page">
      <header className="demo-header">
        <div>
          <h2>Contato</h2>
          <p>Vamos conversar sobre seu próximo projeto.</p>
        </div>
      </header>
      <section className="demo-panel">
        <div className="contact-grid">
          <article className="contact-card">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div>
              <h4>Email</h4>
              <a
                className="contact-link contact-action"
                href="mailto:contato@exemplo.com"
                data-tooltip-id="email-tip"
                data-tooltip-content="Clique para copiar o email"
                onClick={(event) => {
                  event.preventDefault();
                  handleCopyEmail();
                }}
              >
                mmrrricardo@gmail.com
              </a>
              <Tooltip id="email-tip" place="top" className="premium-tooltip" />
              {copyStatus && <p className="contact-status">{copyStatus}</p>}
            </div>
          </article>
          <article className="contact-card">
            <div className="contact-icon">
              <FaLinkedin />
            </div>
            <div>
              <h4>LinkedIn</h4>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/joao-ric/"
                target="_blank"
                rel="noreferrer"
              >
                /in/joao-ric/
              </a>
            </div>
          </article>
          <article className="contact-card">
            <div className="contact-icon">
              <FaGithub />
            </div>
            <div>
              <h4>GitHub</h4>
              <a
                className="contact-link"
                href="https://github.com/joao-rick"
                target="_blank"
                rel="noreferrer"
              >
                /joao-rick
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className="contact-footer">
        <p>
          Busco oportunidades como desenvolvedor contratado.{' '}
          <strong>Disponível para processos seletivos.</strong>
        </p>
      </section>
      <section className="contact-cta">
        <div className="contact-chip">CLT ou PJ</div>
        <div className="contact-chip">Remoto ou híbrido</div>
        <div className="contact-chip">Início imediato</div>
      </section>
    </div>
  );
};

export default ContactPage;
