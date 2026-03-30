import React, { useState } from 'react';
import { useI18n } from '../i18n';

const descriptions = {
  pt: {
    0: 'Céu limpo',
    1: 'Poucas nuvens',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro congelante',
    51: 'Chuvisco leve',
    53: 'Chuvisco moderado',
    55: 'Chuvisco intenso',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva forte',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve forte',
    80: 'Pancadas de chuva',
    95: 'Tempestade',
  },
  en: {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    95: 'Thunderstorm',
  },
};

const WeatherDemo = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const { locale, t } = useI18n();

  const fetchWeather = async () => {
    const query = city.trim();
    if (!query) {
      setError(t('demos.cityMissing'));
      return;
    }
    setStatus('loading');
    setError('');
    setResult(null);
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=${locale}&format=json`
      );
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        setStatus('idle');
        setError(t('demos.cityNotFound'));
        return;
      }
      const place = geoData.results[0];
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m,weather_code`
      );
      const weatherData = await weatherResponse.json();
      setResult({
        name: `${place.name}, ${place.country}`,
        temp: weatherData.current.temperature_2m,
        wind: weatherData.current.wind_speed_10m,
        code: weatherData.current.weather_code,
      });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError(t('demos.weatherLoadError'));
    }
  };

  const weatherMap = descriptions[locale] || descriptions.pt;

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>{t('demos.weatherTitle')}</h2>
          <p>{t('demos.weatherSubtitle')}</p>
        </div>
      </header>

      <section className="demo-controls">
        <input
          type="text"
          placeholder={t('demos.typeCity')}
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="button" onClick={fetchWeather}>
          {t('demos.checkWeather')}
        </button>
      </section>

      {status === 'loading' && <p>{t('demos.loading')}</p>}
      {error && <p className="demo-status">{error}</p>}

      {result && (
        <section className="demo-panel">
          <h3>{result.name}</h3>
          <div className="demo-list">
            <div className="demo-list-row">
              <span>{t('demos.temperature')}</span>
              <strong>{result.temp} C</strong>
            </div>
            <div className="demo-list-row">
              <span>{t('demos.wind')}</span>
              <strong>{result.wind} km/h</strong>
            </div>
            <div className="demo-list-row">
              <span>{t('demos.condition')}</span>
              <strong>{weatherMap[result.code] || t('demos.variableCondition')}</strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WeatherDemo;
