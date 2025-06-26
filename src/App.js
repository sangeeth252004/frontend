import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubjectPage from './pages/SubjectPage';
import ModulePage from './pages/ModulePage';
import QAViewPage from './pages/QAViewPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:semester" element={<SubjectPage />} />
        <Route path="/module/:semester/:subject" element={<ModulePage />} />
        <Route path="/qa/:semester/:subject/:module" element={<QAViewPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
