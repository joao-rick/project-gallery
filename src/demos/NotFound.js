import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const NotFound = () => {
  const { t } = useI18n();

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>{t('notFound.title')}</h2>
          <p>{t('notFound.subtitle')}</p>
        </div>
        <Link className="demo-primary" to="/">
          {t('notFound.cta')}
        </Link>
      </header>
    </div>
  );
};

export default NotFound;
