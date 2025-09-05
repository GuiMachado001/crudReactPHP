import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Formulario from './assets/components/Formulario/Formulario';
import ListarUsuarios from './assets/components/ListarUsuarios/ListarUsuarios';

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Links para navegar entre páginas */}
        <Link to="/formulario">Cadastrar Usuário</Link> |{" "}
        <Link to="/listar">Listar Usuários</Link>
      </nav>

      <Routes>
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/listar" element={<ListarUsuarios />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
