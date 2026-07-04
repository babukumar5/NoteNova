import { useEffect } from 'react';
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
  useEffect(() => {
    // Detect if this is the first page loaded in this browser tab session
    const isDirectEntry = !sessionStorage.getItem('has_navigated');
    sessionStorage.setItem('has_navigated', 'true');

    if (isDirectEntry && window.location.pathname !== '/') {
      const currentPath = window.location.pathname;
      // Prepend Home '/' to history so Back goes to '/'
      window.history.replaceState(null, '', '/');
      window.history.pushState(null, '', currentPath);
    }
  }, []);

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
