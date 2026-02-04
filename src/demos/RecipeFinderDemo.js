import React, { useEffect, useState } from 'react';

const RecipeFinderDemo = () => {
  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [translatedNames, setTranslatedNames] = useState({});
  const [translatedSelected, setTranslatedSelected] = useState(null);

  const translateText = async (text, from, to) => {
    if (!text) {
      return '';
    }
    try {
      const response = await fetch('https://translate.argosopentech.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: from,
          target: to,
          format: 'text',
        }),
      });
      const data = await response.json();
      return data.translatedText || text;
    } catch (err) {
      return text;
    }
  };

  const searchRecipes = async () => {
    const query = ingredient.trim();
    if (!query) {
      setError('Digite um ingrediente.');
      return;
    }
    setStatus('loading');
    setError('');
    setMeals([]);
    setSelected(null);
    setTranslatedSelected(null);
    setTranslatedNames({});
    try {
      const translatedIngredient = await translateText(query, 'pt', 'en');
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          translatedIngredient
        )}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError('Não foi possível buscar receitas.');
    }
  };

  useEffect(() => {
    let cancelled = false;
    const translateMeals = async () => {
      if (!meals.length) {
        return;
      }
      const updates = {};
      for (const meal of meals) {
        const translated = await translateText(meal.strMeal, 'en', 'pt');
        updates[meal.idMeal] = translated;
        if (cancelled) {
          return;
        }
        setTranslatedNames((prev) => ({ ...prev, [meal.idMeal]: translated }));
      }
    };
    translateMeals();
    return () => {
      cancelled = true;
    };
  }, [meals]);

  const selectMeal = async (meal) => {
    setSelected(null);
    setTranslatedSelected(null);
    setStatus('loading');
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await response.json();
      const fullMeal = data.meals ? data.meals[0] : null;
      setSelected(fullMeal);
      if (fullMeal) {
        const [namePt, categoryPt, areaPt, instructionsPt] = await Promise.all([
          translateText(fullMeal.strMeal, 'en', 'pt'),
          translateText(fullMeal.strCategory, 'en', 'pt'),
          translateText(fullMeal.strArea, 'en', 'pt'),
          translateText(fullMeal.strInstructions, 'en', 'pt'),
        ]);
        setTranslatedSelected({
          ...fullMeal,
          strMeal: namePt,
          strCategory: categoryPt,
          strArea: areaPt,
          strInstructions: instructionsPt,
        });
      }
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError('Não foi possível carregar a receita.');
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Busca de Receitas</h2>
          <p>Pesquise receitas por ingrediente.</p>
        </div>
      </header>

      <section className="demo-controls">
        <input
          type="text"
          placeholder="Ex: frango, tomate, queijo"
          value={ingredient}
          onChange={(event) => setIngredient(event.target.value)}
        />
        <button type="button" onClick={searchRecipes}>
          Buscar
        </button>
      </section>

      {status === 'loading' && <p>Carregando...</p>}
      {error && <p className="demo-status">{error}</p>}

      <section className="demo-grid">
        {meals.map((meal) => (
          <article key={meal.idMeal} className="demo-card">
            <h3>{translatedNames[meal.idMeal] || meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <button type="button" onClick={() => selectMeal(meal)}>
              Ver receita
            </button>
          </article>
        ))}
      </section>

      {selected && (
        <section className="demo-panel">
          <h3>
            {(translatedSelected && translatedSelected.strMeal) ||
              selected.strMeal}
          </h3>
          <p>
            {(translatedSelected && translatedSelected.strArea) ||
              selected.strArea}{' '}
            ·{' '}
            {(translatedSelected && translatedSelected.strCategory) ||
              selected.strCategory}
          </p>
          <div className="demo-list">
            <div className="demo-list-row">
              <span>Modo de preparo</span>
              <strong>Detalhes abaixo</strong>
            </div>
          </div>
          <p className="demo-recipe">
            {(translatedSelected && translatedSelected.strInstructions) ||
              selected.strInstructions}
          </p>
        </section>
      )}
    </div>
  );
};

export default RecipeFinderDemo;
