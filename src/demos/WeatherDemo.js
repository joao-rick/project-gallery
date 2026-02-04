import React, { useState } from 'react';

const weatherDescriptions = {
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
};

const WeatherDemo = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const query = city.trim();
    if (!query) {
      setError('Digite uma cidade.');
      return;
    }
    setStatus('loading');
    setError('');
    setResult(null);
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=pt&format=json`
      );
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        setStatus('idle');
        setError('Cidade não encontrada.');
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
      setError('Não foi possível carregar o clima.');
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Clima Agora</h2>
          <p>Condições atuais em tempo real.</p>
        </div>
      </header>

      <section className="demo-controls">
        <input
          type="text"
          placeholder="Digite uma cidade"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="button" onClick={fetchWeather}>
          Ver clima
        </button>
      </section>

      {status === 'loading' && <p>Carregando...</p>}
      {error && <p className="demo-status">{error}</p>}

      {result && (
        <section className="demo-panel">
          <h3>{result.name}</h3>
          <div className="demo-list">
            <div className="demo-list-row">
              <span>Temperatura</span>
              <strong>{result.temp}°C</strong>
            </div>
            <div className="demo-list-row">
              <span>Vento</span>
              <strong>{result.wind} km/h</strong>
            </div>
            <div className="demo-list-row">
              <span>Condição</span>
              <strong>
                {weatherDescriptions[result.code] || 'Condição variável'}
              </strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WeatherDemo;
