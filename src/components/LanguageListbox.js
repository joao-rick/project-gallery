import React, { useEffect, useRef, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useI18n } from '../i18n';

const options = [
  { value: 'pt', label: 'PT-BR' },
  { value: 'en', label: 'EN-US' },
];

const LanguageListbox = () => {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const active = options.find((item) => item.value === locale) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="language-listbox" ref={rootRef}>
      <span className="language-listbox-label">
        <FaGlobe /> {t('nav.localeLabel')}
      </span>
      <button
        type="button"
        className="language-listbox-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.localeLabel')}
        onClick={() => setOpen((prev) => !prev)}
      >
        {active.label}
      </button>
      {open && (
        <ul className="language-listbox-options" role="listbox" aria-label={t('nav.localeLabel')}>
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={locale === option.value}>
              <button
                type="button"
                className={locale === option.value ? 'is-active' : ''}
                onClick={() => {
                  setLocale(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageListbox;

