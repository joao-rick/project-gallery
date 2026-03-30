import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useI18n } from '../i18n';

const ContactPage = () => {
  const [copyStatus, setCopyStatus] = useState('');
  const { t } = useI18n();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mmrrricardo@gmail.com');
      setCopyStatus(t('contact.copied'));
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus(t('contact.copyFailed'));
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  return (
    <div className="demo-page contact-page">
      <header className="demo-header">
        <div>
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>
      </header>
      <section className="demo-panel">
        <div className="contact-grid">
          <article className="contact-card">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div>
              <h4>{t('contact.email')}</h4>
              <a
                className="contact-link contact-action"
                href="mailto:contato@exemplo.com"
                data-tooltip-id="email-tip"
                data-tooltip-content={t('contact.copyHint')}
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
              <h4>{t('contact.linkedin')}</h4>
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
              <h4>{t('contact.github')}</h4>
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
          {t('contact.hiringLead')} <strong>{t('contact.hiringStrong')}</strong>
        </p>
      </section>
      <section className="contact-cta">
        <div className="contact-chip">{t('contact.chip1')}</div>
        <div className="contact-chip">{t('contact.chip2')}</div>
        <div className="contact-chip">{t('contact.chip3')}</div>
      </section>
    </div>
  );
};

export default ContactPage;
