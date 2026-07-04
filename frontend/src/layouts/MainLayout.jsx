import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  Moon, 
  Sun, 
  Settings, 
  X 
} from 'lucide-react';

/**
 * Main Application Shell. Houses the global floating glass navbar, responsive navigation,
 * sidebar toggler, and layout grid setup.
 */
export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // About Link Click Handler
  const handleAboutClick = () => {
    if (window.location.pathname === '/') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#about');
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary transition-colors duration-300 flex flex-col">
      
      {/* Mobile Drawer Overlay (for sidebar) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/10 dark:bg-black/35 backdrop-blur-xs md:hidden"
        />
      )}

      {/* 1. Global Floating Glass Navbar */}
      <nav className="fixed top-4 left-4 right-4 z-40 h-14 rounded-2xl glass-nav flex items-center justify-between px-4 md:px-6 select-none">
        
        {/* Left Section: Branding & Mobile Menu Toggler (Sidebar) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover md:hidden transition-colors cursor-pointer"
            aria-label="Toggle Navigation Drawer"
            id="mobile-drawer-toggle"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-brand-primary flex items-center justify-center">
              <span className="text-bg-primary font-display font-black text-xs">N</span>
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:inline-block">
              NoteNova
            </span>
          </Link>
        </div>

        {/* Center Section: Responsive Navigation Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-text-secondary">
          <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
          <button 
            onClick={handleAboutClick} 
            className="hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none font-semibold text-xs text-text-secondary hover:scale-[1.01] transition-transform"
          >
            About
          </button>
        </div>

        {/* Right Section: Theme Toggle, Settings, & Mobile Navbar Toggler */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover transition-colors cursor-pointer"
            aria-label="Toggle Theme"
            id="theme-toggler"
          >
            {theme === 'light' ? (
              <Moon className="h-4.5 w-4.5" />
            ) : (
              <Sun className="h-4.5 w-4.5" />
            )}
          </button>
          
          <button
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover transition-colors cursor-pointer"
            aria-label="Settings"
            id="settings-trigger"
            onClick={() => alert("Settings panel coming soon in V2!")}
          >
            <Settings className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover md:hidden transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            id="mobile-nav-toggle"
          >
            {mobileNavOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileNavOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 mx-4 rounded-xl border border-border bg-bg-primary/95 p-4 shadow-lg backdrop-blur-md flex flex-col gap-3 md:hidden animate-fade-in">
            <Link 
              to="/" 
              onClick={() => setMobileNavOpen(false)} 
              className="text-xs font-semibold text-text-secondary hover:text-text-primary py-1"
            >
              Home
            </Link>
            <button 
              onClick={() => { setMobileNavOpen(false); handleAboutClick(); }} 
              className="text-left text-xs font-semibold text-text-secondary hover:text-text-primary py-1 cursor-pointer bg-transparent border-none"
            >
              About
            </button>
          </div>
        )}

      </nav>

      {/* 2. Floating Sidebar panel */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 3. Floating Content Pane */}
      <div className="flex-1 flex flex-col md:pl-76 pt-22 pr-4 pb-4 min-h-screen">
        <main className="flex-grow flex flex-col min-h-0 bg-bg-primary border border-border/80 dark:border-border/30 rounded-2xl shadow-xs transition-colors duration-300">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
