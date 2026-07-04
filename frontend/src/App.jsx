import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotesProvider } from './context/NotesContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import NoteView from './pages/NoteView';
import NotFound from './pages/NotFound';

/**
 * Root Application Routing configuration.
 * Decouples the public Home landing page from the MainLayout workspace shell.
 */
function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <Router>
          <Routes>
            {/* Standalone Landing Page (No Sidebar, search-bar, or editor workspace) */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Workspace shell wrapping Note editor views */}
            <Route path="/" element={<MainLayout />}>
              <Route path=":slug" element={<NoteView />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;
