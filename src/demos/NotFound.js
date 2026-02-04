import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Página não encontrada</h2>
          <p>O endereço digitado não existe.</p>
        </div>
        <Link className="demo-primary" to="/">
          Voltar para a galeria
        </Link>
      </header>
    </div>
  );
};

export default NotFound;
