import './App.css';
import Navbar from './components/Navbar';
import ProjectGallery from './components/ProjectGallery';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Galeria de Projetos</h1>
      <ProjectGallery />
    </div>
  );
}

export default App;
