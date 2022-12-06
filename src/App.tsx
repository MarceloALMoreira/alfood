import { Routes, Route } from 'react-router-dom';
import AdmRestaurantes from './paginas/Admin';
import { FormularioRestaurante } from './paginas/Admin/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Admin/PaginaBaseAdmin';
import AdminPratos from './paginas/Admin/Pratos';
import { FormularioPrato } from './paginas/Admin/Pratos/FormularioPrato';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>

        <Route path="restaurantes" element={<AdmRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdminPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>


    </Routes>
  );
}

export default App;
