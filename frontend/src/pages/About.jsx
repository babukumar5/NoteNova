import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  Cloud, 
  Edit3, 
  Lock, 
  Download, 
  Smartphone, 
  Moon, 
  Sun, 
  Globe, 
  FileText, 
  Share2,
  Code,
  GraduationCap,
  Users,
  PenTool,
  Globe2,
  Sparkles,
  HelpCircle,
  Link2,
  CheckCircle,
  Eye
} from 'lucide-react';

/**
 * Premium Standalone About Page for NoteNest.
 */
export default function About() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary transition-colors duration-300 flex flex-col font-sans selection:bg-hover">
      
      {/* 1. Floating Sticky Navbar */}
      <header className="sticky top-4 left-4 right-4 z-40 mx-4 mt-4 h-14 rounded-full border border-border bg-bg-primary/80 backdrop-blur-md flex items-center justify-between px-6 shadow-2xs select-none">
        
        {/* Left: Branding */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-brand-primary flex items-center justify-center">
            <span className="text-bg-primary font-display font-black text-xs">N</span>
          </div>
          <span className="font-display font-bold text-sm tracking-tight">NOTE NEST</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-text-secondary">
          <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
          <span className="text-border/80">|</span>
          <a href="#" className="text-text-primary">About</a>
        </nav>

        {/* Right: Auth & Theme toggles */}
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
            onClick={() => alert("Log In coming in NoteNest V2")}
            className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Log In
          </button>
          
          <button 
            onClick={() => alert("Sign Up coming in NoteNest V2")}
            className="bg-brand-primary text-bg-primary px-4 py-2 rounded-full hover:bg-brand-hover transition-all hover:scale-[1.02] cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 md:py-24 flex flex-col items-center select-none">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-bg-primary text-[10px] font-bold text-text-secondary mb-4 shadow-3xs">
            <Sparkles className="h-3 w-3 text-text-primary" />
            <span>Core Values & Vision</span>
          </div>
          
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight leading-tight mb-6 text-text-primary">
            About NoteNest
          </h1>
          
          <p className="font-sans text-text-secondary text-sm sm:text-base leading-relaxed">
            NoteNest is a modern URL-first online note-taking platform where every unique URL becomes an instant workspace. Create notes, edit them, organize your ideas, and share them effortlessly. No unnecessary setup—just open a URL and start writing.
          </p>
        </div>

        {/* Our Mission */}
        <section className="w-full border-t border-border pt-14 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="font-display font-extrabold text-2xl text-text-primary tracking-tight md:sticky md:top-24">
                Our Mission
              </h2>
            </div>
            <div className="md:col-span-2 select-text">
              <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                At NoteNest, we believe note-taking should be simple, fast, and distraction-free.
              </p>
              <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                Instead of forcing users through lengthy sign-up processes, we let them focus on what matters most—capturing ideas instantly.
              </p>
              <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                Our goal is to build a writing experience that feels effortless while remaining fast, secure, and accessible from anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="w-full border-t border-border pt-14 mb-20">
          <h2 className="font-display font-extrabold text-xl text-text-primary text-center mb-10 tracking-tight">
            Our Philosophy
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <span className="text-sm mb-2 block">🔗</span>
              <h3 className="font-display font-bold text-xs text-text-primary mb-1">URL-First</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Every unique URL becomes its own workspace.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <span className="text-sm mb-2 block">✨</span>
              <h3 className="font-display font-bold text-xs text-text-primary mb-1">Simplicity</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                No complicated workflows—just write.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <span className="text-sm mb-2 block">☁</span>
              <h3 className="font-display font-bold text-xs text-text-primary mb-1">Automatic Saving</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Your notes are continuously saved while you work.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <span className="text-sm mb-2 block">🔒</span>
              <h3 className="font-display font-bold text-xs text-text-primary mb-1">Privacy</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                We only store data required for service. V2 features private notes.
              </p>
            </div>

          </div>
        </section>

        {/* How It Works */}
        <section className="w-full border-t border-border pt-14 mb-20">
          <h2 className="font-display font-extrabold text-xl text-text-primary text-center mb-10 tracking-tight">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl border border-border bg-bg-primary shadow-[0_4px_24px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary font-display font-bold text-xs mb-4">
                ①
              </div>
              <h3 className="font-display font-bold text-sm mb-1.5 text-text-primary">Choose Any URL</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Open any unique address like <span className="font-mono text-[10px] text-text-primary bg-hover px-1 rounded">/project-ideas</span> and a new workspace is created instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-bg-primary shadow-[0_4px_24px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary font-display font-bold text-xs mb-4">
                ②
              </div>
              <h3 className="font-display font-bold text-sm mb-1.5 text-text-primary">Write</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Use the rich editor to format your notes, code snippets, checklists, tables, and more. Everything saves automatically while you type.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-bg-primary shadow-[0_4px_24px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary font-display font-bold text-xs mb-4">
                ③
              </div>
              <h3 className="font-display font-bold text-sm mb-1.5 text-text-primary">Share</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Simply copy the URL and share it. Anyone with the link can continue the conversation or collaborate.
              </p>
            </div>

          </div>
        </section>

        {/* Features */}
        <section className="w-full border-t border-border pt-14 mb-20">
          <h2 className="font-display font-extrabold text-xl text-text-primary text-center mb-10 tracking-tight">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            
            {/* Rich Text Editor */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Edit3 className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">Rich Text Editor</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                A modern editor supporting headings, lists, tables, quotes, checklists, code blocks, and more.
              </p>
            </div>

            {/* Automatic Saving */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Cloud className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">Automatic Saving</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Every change is saved automatically so your work is never lost.
              </p>
            </div>

            {/* Shareable URLs */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Link2 className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">Shareable URLs</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Every note has a unique URL that makes sharing simple.
              </p>
            </div>

            {/* Responsive Design */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Smartphone className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">Responsive Design</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Works beautifully across desktop, tablet, and mobile devices.
              </p>
            </div>

            {/* Future Security */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">Future Security</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Private workspaces, password protection, and permission-based sharing are planned for V2.
              </p>
            </div>

            {/* Export */}
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-2xs hover:border-text-primary transition-all">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Download className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1.5 text-text-primary">Export</h3>
              <p className="font-sans text-[10px] text-text-secondary leading-relaxed">
                Download notes as PDF, Markdown, or HTML (future enhancement).
              </p>
            </div>

          </div>
        </section>

        {/* Built By */}
        <section className="w-full border-t border-border pt-14 mb-20 select-text">
          <div className="max-w-xl mx-auto rounded-3xl border border-border bg-bg-primary p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.005)] hover:border-text-primary transition-all duration-250">
            <h2 className="font-display font-extrabold text-lg text-text-primary text-center mb-6">
              Built By
            </h2>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-hover flex items-center justify-center mb-4 border border-border">
                <span className="font-display font-black text-xl text-text-primary">BK</span>
              </div>
              <h3 className="font-display font-bold text-sm text-text-primary mb-1">
                BABU KUMAR
              </h3>
              <p className="font-sans text-xs text-text-secondary mb-4 font-semibold">
                Information Technology Student
              </p>
              <p className="font-sans text-xs text-text-secondary max-w-sm leading-relaxed mb-6">
                NoteNest is designed and developed by BABU KUMAR, an Information Technology student passionate about building modern web applications using the MERN stack. The goal of NoteNest is to create a simple, fast, and beautiful writing experience that anyone can use instantly.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs text-text-secondary hover:text-text-primary hover:bg-hover active:bg-active transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs text-text-secondary hover:text-text-primary hover:bg-hover active:bg-active transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <button 
                  onClick={() => alert("Portfolio site coming soon!")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs text-text-secondary hover:text-text-primary hover:bg-hover active:bg-active transition-all cursor-pointer"
                >
                  <Globe2 className="h-4 w-4" />
                  <span>Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full border-t border-border pt-14 mb-20">
          <h2 className="font-display font-extrabold text-xl text-text-primary text-center mb-10 tracking-tight">
            Use Cases
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            
            <div className="p-4 rounded-xl border border-border/80 bg-bg-primary shadow-3xs">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Code className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Developers</h3>
              <p className="font-sans text-[9px] text-text-secondary leading-relaxed">
                Store code snippets, commands, API references, and documentation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-bg-primary shadow-3xs">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <GraduationCap className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Students</h3>
              <p className="font-sans text-[9px] text-text-secondary leading-relaxed">
                Take lecture notes, prepare study material, and organize assignments.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-bg-primary shadow-3xs">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Teams</h3>
              <p className="font-sans text-[9px] text-text-secondary leading-relaxed">
                Meeting notes, documentation, brainstorming sessions, and shared planning.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-bg-primary shadow-3xs">
              <div className="h-8 w-8 rounded-lg bg-hover flex items-center justify-center text-text-primary mb-3">
                <PenTool className="h-4 w-4" />
              </div>
              <h3 className="font-display font-bold text-xs mb-1 text-text-primary">Writers</h3>
              <p className="font-sans text-[9px] text-text-secondary leading-relaxed">
                Draft articles, blogs, books, and creative ideas in a distraction-free environment.
              </p>
            </div>

          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="w-full border-t border-border pt-14 mb-10" id="faqs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-text-primary tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-xs text-text-secondary">
              Find instant answers to common questions about NoteNest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left select-text">
            
            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-3xs">
              <h3 className="font-display font-bold text-xs text-text-primary mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted" />
                <span>Is NoteNest free?</span>
              </h3>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Yes. Public notes are completely free.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-3xs">
              <h3 className="font-display font-bold text-xs text-text-primary mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted" />
                <span>Do I need an account?</span>
              </h3>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                No. Public notes work instantly without creating an account.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-3xs">
              <h3 className="font-display font-bold text-xs text-text-primary mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted" />
                <span>How do I create a note?</span>
              </h3>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Simply visit any unique URL and start writing.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-3xs">
              <h3 className="font-display font-bold text-xs text-text-primary mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted" />
                <span>Does NoteNest save automatically?</span>
              </h3>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Yes. Every change is automatically saved while you type.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-3xs">
              <h3 className="font-display font-bold text-xs text-text-primary mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted" />
                <span>Can I share notes?</span>
              </h3>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Yes. Every note has its own unique URL that can be shared.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-bg-primary shadow-3xs">
              <h3 className="font-display font-bold text-xs text-text-primary mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted" />
                <span>Will private notes be available?</span>
              </h3>
              <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
                Yes. Authentication, private workspaces, and permissions are planned for future versions.
              </p>
            </div>

          </div>
        </section>

      </div>

      {/* 9. Footer */}
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
              A modern URL-first note-taking platform built for speed, simplicity, and productivity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-10 md:gap-16">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Quick Links</span>
              <Link to="/" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">Home</Link>
              <a href="#" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">About</a>
              <a href="#faqs" className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">FAQs</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Legal & Contact</span>
              <button onClick={() => alert("Privacy policy")} className="text-[11px] text-left text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Privacy</button>
              <button onClick={() => alert("Terms of service")} className="text-[11px] text-left text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Terms</button>
              <button onClick={() => alert("Contact support")} className="text-[11px] text-left text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Contact</button>
            </div>
          </div>

        </div>

        <div className="max-w-4xl mx-auto px-6 border-t border-border/40 pt-6 flex items-center justify-between text-[10px]">
          <span>© 2026 NoteNest. All Rights Reserved.</span>
          <span>Designed with Apple aesthetics.</span>
        </div>
      </footer>

    </div>
  );
}
