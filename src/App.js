import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectGallery from './components/ProjectGallery';
import EcommerceDemo from './demos/EcommerceDemo';
import WeatherDemo from './demos/WeatherDemo';
import TaskManagerDemo from './demos/TaskManagerDemo';
import PortfolioDemo from './demos/PortfolioDemo';
import BlogDemo from './demos/BlogDemo';
import RecipeFinderDemo from './demos/RecipeFinderDemo';
import AboutMePage from './demos/AboutMePage';
import ContactPage from './demos/ContactPage';
import NotFound from './demos/NotFound';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {loading && (
          <div className="loading-screen">
            <div className="loading-orb" />
            <p>Carregando experiências...</p>
          </div>
        )}
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <AboutMePage />
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <section className="projects-hero">
                    <h1>Galeria de Projetos</h1>
                    <p>
                      Coleção de demos funcionais com foco em experiência do usuário,
                      arquitetura front-end e integrações modernas.
                    </p>
                  </section>
                  <ProjectGallery />
                </>
              }
            />
            <Route path="/projects/ecommerce" element={<EcommerceDemo />} />
            <Route path="/projects/weather" element={<WeatherDemo />} />
            <Route path="/projects/tasks" element={<TaskManagerDemo />} />
            <Route path="/projects/portfolio" element={<PortfolioDemo />} />
            <Route path="/projects/blog" element={<BlogDemo />} />
            <Route path="/projects/recipes" element={<RecipeFinderDemo />} />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
