import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useDebounce } from '../hooks/useDebounce';
import { noteService } from '../services/noteService';
import { 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  Settings, 
  FileText, 
  Loader2, 
  X 
} from 'lucide-react';

/**
 * Main Application Shell. Houses the global floating glass navbar, Spotlight Search,
 * sidebar toggler, and layout grid setup.
 */
export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { slug: activeSlug } = useParams();

  // Spotlight Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  const searchContainerRef = useRef(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search call
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await noteService.searchNotes(debouncedSearchQuery);
        if (res.success) {
          setSearchResults(res.data);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };
    performSearch();
  }, [debouncedSearchQuery]);

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary transition-colors duration-300 flex flex-col">
      
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/10 dark:bg-black/35 backdrop-blur-xs md:hidden"
        />
      )}

      {/* 1. Global Floating Glass Navbar */}
      <nav className="fixed top-4 left-4 right-4 z-40 h-14 rounded-2xl glass-nav flex items-center justify-between px-4 md:px-6 select-none">
        
        {/* Left Section: Branding & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover md:hidden transition-colors cursor-pointer"
            aria-label="Toggle Navigation Drawer"
            id="mobile-drawer-toggle"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={() => {
              setSearchQuery('');
              setShowSearchDropdown(false);
            }}
          >
            <div className="h-6 w-6 rounded-md bg-brand-primary flex items-center justify-center">
              <span className="text-bg-primary font-display font-black text-xs">N</span>
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:inline-block">
              NoteNova
            </span>
          </Link>
        </div>

        {/* Center Section: Spotlight Search Input bar */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-sm sm:max-w-md mx-4" id="global-search-container">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search notes globally..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            className="w-full rounded-xl border border-border bg-bg-secondary/40 pl-9 pr-8 py-1.5 text-xs text-text-primary placeholder-text-muted transition-all focus:border-text-primary focus:bg-bg-primary focus:outline-none"
            id="spotlight-search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary cursor-pointer"
              id="clear-search-button"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Autocomplete Dropdown Panel */}
          {showSearchDropdown && searchQuery.trim() && (
            <div className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-lg backdrop-blur-md custom-scrollbar animate-fade-in">
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/50">
                <span className="text-[9px] font-bold tracking-wider text-text-muted uppercase">
                  Spotlight Match
                </span>
                {isSearching && <Loader2 className="h-3 w-3 animate-spin text-text-muted" />}
              </div>
              
              {searchResults.length > 0 ? (
                <div className="py-1">
                  {searchResults.map((note) => (
                    <Link
                      key={note.slug}
                      to={`/${note.slug}`}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        setSearchQuery('');
                        setSidebarOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs text-text-secondary hover:bg-hover hover:text-text-primary transition-colors"
                      id={`search-item-${note.slug}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-text-muted" />
                        <span className="truncate font-medium">{note.title}</span>
                      </div>
                      <span className="text-[9px] text-text-muted font-mono shrink-0 ml-1">
                        /{note.slug}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                !isSearching && (
                  <div className="py-4 text-center text-xs text-text-muted">
                    No matching notes found
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Right Section: Theme Toggle & Settings (Future) */}
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
        </div>

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
