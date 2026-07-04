import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Zap, 
  Cloud, 
  Edit3, 
  Lock, 
  Download, 
  Smartphone, 
  ArrowRight,
  Sun,
  Moon,
  Globe,
  FileText,
  Share2,
  Code,
  GraduationCap,
  Users,
  PenTool
} from 'lucide-react';

/**
 * Premium Apple-Style Standalone SaaS Landing Page for NoteNest.
 */
export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // URL Input Form States
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const RESERVED = new Set(['api', 'search', 'recent', 'static', 'admin', 'assets', 'favicon', 'robots.txt', 'sitemap.xml', 'index', 'home']);

  const handleSlugChange = (val, setValState, setErrorState) => {
    // Normalize slug parameters
    const normalized = val
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '');

    setValState(normalized);

    if (RESERVED.has(normalized)) {
      setErrorState(`"${normalized}" is a reserved system path.`);
    } else {
      setErrorState('');
    }
  };

  const handleOpenNote = (noteSlug, slugError) => {
    if (!noteSlug.trim() || slugError) return;
    navigate(`/${noteSlug.trim()}`);
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary transition-colors duration-300 flex flex-col font-sans selection:bg-hover">
      
      {/* 1. Navbar */}
      <header className="sticky top-4 left-4 right-4 z-40 mx-4 mt-4 h-14 rounded-full border border-border bg-bg-primary/80 backdrop-blur-md flex items-center justify-between px-6 shadow-2xs select-none">
        
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-brand-primary flex items-center justify-center">
            <span className="text-bg-primary font-display font-black text-xs">N</span>
          </div>
          <span className="font-display font-bold text-sm tracking-tight">NOTE NEST</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-text-secondary">
          <Link to="/" className="text-text-primary">Home</Link>
          <span className="text-border/80">|</span>
          <Link to="/about" className="hover:text-text-primary transition-colors">About</Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button 
            onClick={toggleTheme}
            className="p-1 rounded-lg text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'light' ? (
              <Moon className="h-4.5 w-4.5" />
            ) : (
              <Sun className="h-4.5 w-4.5" />
            )}
          </button>
          
          <button 
            onClick={() => alert("Log In system coming in NoteNest V2")}
            className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Log In
          </button>
          
          <button 
            onClick={() => alert("Sign Up system coming in NoteNest V2")}
            className="bg-brand-primary text-bg-primary px-4 py-2 rounded-full hover:bg-brand-hover transition-all hover:scale-[1.02] cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-12 md:pt-24 md:pb-16 max-w-4xl mx-auto w-full select-none">
        
        {/* Large headline */}
        <div className="max-w-2xl mb-8">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6 text-text-primary">
            Your Free Online Notepad <br />
            <span className="inline-block mt-4 px-6 py-2 rounded-full bg-brand-primary text-bg-primary text-2xl sm:text-3xl md:text-4xl font-display font-bold shadow-sm">
              Every URL is a Note
            </span>
          </h1>
          <p className="font-sans text-text-secondary text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Create, edit, organize and share notes instantly. No account required for public notes. Simply type a URL and begin writing.
          </p>
        </div>

        {/* Large URL Input */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleOpenNote(slug, error); }}
          className="w-full max-w-lg mb-4"
        >
          <div className="relative flex items-center p-1.5 rounded-2xl border border-border bg-bg-primary shadow-[0_8px_30px_rgba(0,0,0,0.015)] focus-within:border-text-primary transition-all duration-250">
            <span className="pl-4 text-xs font-semibold text-text-muted font-sans shrink-0">
              notenest.com/
            </span>
            <input
              type="text"
              placeholder="project-ideas"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value, setSlug, setError)}
              className="w-full bg-transparent px-2 py-2 text-xs font-semibold text-text-primary placeholder-text-muted focus:outline-none"
              autoFocus
              id="hero-slug-input"
            />
            <button
              type="submit"
              disabled={!slug.trim() || !!error}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-bg-primary text-xs font-semibold hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              id="hero-slug-submit"
            >
              <span>Open</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-danger font-medium text-center font-sans">
              {error}
            </p>
          )}
        </form>

        <span className="font-sans text-[10px] text-text-muted mb-20 block">
          Designed for developers, students, creators, writers and teams.
        </span>

        {/* 2. How NoteNest Works */}
        <div className="w-full border-t border-border pt-16 mb-20" id="works">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text-primary mb-3">
              How NoteNest Works
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
              Create a note in seconds. No signup. No setup. No friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="flex flex-col items-center p-6 rounded-2xl border border-border bg-bg-primary shadow-[0_4px_24px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all duration-250">
              <div className="h-9 w-9 rounded-xl bg-hover flex items-center justify-center text-text-primary mb-4 shrink-0 font-display font-bold text-xs">
                1
              </div>
              <h3 className="font-display font-bold text-sm mb-2 text-text-primary">
                Choose Any URL
              </h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-[200px] mb-2">
                Visit <span className="font-mono text-[10px] text-text-primary bg-hover px-1 py-0.5 rounded">/project-ideas</span> or <span className="font-mono text-[10px] text-text-primary bg-hover px-1 py-0.5 rounded">/interview-notes</span>
              </p>
              <p className="font-sans text-[11px] text-text-muted leading-relaxed max-w-[200px]">
                Any unique URL path instantly becomes a new workspace.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center p-6 rounded-2xl border border-border bg-bg-primary shadow-[0_4px_24px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all duration-250">
              <div className="h-9 w-9 rounded-xl bg-hover flex items-center justify-center text-text-primary mb-4 shrink-0 font-display font-bold text-xs">
                2
              </div>
              <h3 className="font-display font-bold text-sm mb-2 text-text-primary">
                Start Writing
              </h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-[200px] mb-2">
                Write with the rich editor.
              </p>
              <p className="font-sans text-[11px] text-text-muted leading-relaxed max-w-[200px]">
                Everything saves automatically in the background while you type.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center p-6 rounded-2xl border border-border bg-bg-primary shadow-[0_4px_24px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all duration-250">
              <div className="h-9 w-9 rounded-xl bg-hover flex items-center justify-center text-text-primary mb-4 shrink-0 font-display font-bold text-xs">
                3
              </div>
              <h3 className="font-display font-bold text-sm mb-2 text-text-primary">
                Share
              </h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-[200px] mb-2">
                Copy the URL and share it.
              </p>
              <p className="font-sans text-[11px] text-text-muted leading-relaxed max-w-[200px]">
                Open the same note anytime, from any browser or location.
              </p>
            </div>

          </div>
        </div>

        {/* 3. Features Section */}
        <div className="w-full border-t border-border pt-16 mb-20" id="features">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text-primary mb-3">
              Everything You Need To Write
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
              Premium document writing workspace with none of the friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">⚡ Instant Notes</h3>
              </div>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Open any URL path and immediately start writing. No setup is required.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Cloud className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">☁ Automatic Saving</h3>
              </div>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Changes are saved continuously in the background to MongoDB without clicking Save.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Edit3 className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">📝 Rich Text Editor</h3>
              </div>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Checklists, heading structures, lists, inline markers, and resizable data tables.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Lock className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">🔒 Privacy Ready</h3>
              </div>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Future support for password locks, encrypted notes, and private sharing rules.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Download className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">📄 Export</h3>
              </div>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Download your notes as PDF, clean Markdown document formats, or raw HTML code (V2).
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Smartphone className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">📱 Responsive</h3>
              </div>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Adapts horizontally on all viewports, providing a beautiful mobile writing experience.
              </p>
            </div>

          </div>
        </div>

        {/* 4. Use Cases Section */}
        <div className="w-full border-t border-border pt-16 mb-16" id="use-cases">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text-primary mb-3">
              Perfect For
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
              NoteNest is optimized for diverse documentation workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            
            {/* Developers */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[150px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Code className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Developers</h3>
              </div>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Store code blocks, configuration files, API payloads, cheatsheets, and CLI notes.
              </p>
            </div>

            {/* Students */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[150px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Students</h3>
              </div>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Capture lecture notes, reading summaries, assignments checklists, and revisions.
              </p>
            </div>

            {/* Teams */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[150px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <Users className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Teams</h3>
              </div>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Collaborate on meeting logs, product specifications, requirements, and planning schedules.
              </p>
            </div>

            {/* Writers */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all duration-250 flex flex-col justify-between min-h-[150px]">
              <div>
                <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                  <PenTool className="h-4 w-4" />
                </div>
                <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Writers</h3>
              </div>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Draft blogs, script reviews, articles, outlines, book chapters, and daily journals.
              </p>
            </div>

        </div>
      </div>

    </section>

      {/* 6. Footer */}
      <footer className="border-t border-border bg-bg-primary py-12 text-left text-xs text-text-muted font-sans select-none shrink-0">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-brand-primary flex items-center justify-center">
                <span className="text-bg-primary font-display font-black text-xs">N</span>
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-text-primary">NoteNest</span>
            </div>
            <p className="text-[11px] text-text-secondary max-w-xs leading-relaxed">
              The simplest URL-first note platform. Built for students, developers, creators, writers and teams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-10 md:gap-16">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Quick Links</span>
              <Link to="/" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">About</Link>
              <a href="#features" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">Features</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Legal & GitHub</span>
              <button onClick={() => alert("Privacy policy")} className="text-[11px] text-left text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Privacy</button>
              <button onClick={() => alert("Terms of service")} className="text-[11px] text-left text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Terms</button>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">GitHub</a>
            </div>
          </div>

        </div>

        <div className="max-w-4xl mx-auto px-6 border-t border-border/40 pt-6 flex items-center justify-between text-[10px]">
          <span>© 2026 NoteNest. All rights reserved.</span>
          <span>Designed with Apple aesthetics.</span>
        </div>
      </footer>

    </div>
  );
}
