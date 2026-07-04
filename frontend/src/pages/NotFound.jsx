import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

/**
 * 404 - Not Found view page.
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center select-none">
      <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center text-slate-400 mb-4 border border-slate-200/50 dark:border-slate-850">
        <HelpCircle className="h-7 w-7" />
      </div>
      
      <h1 className="font-display font-extrabold text-3xl mb-2 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
        Workspace Not Found
      </h1>
      
      <p className="font-sans text-sm text-slate-400 max-w-xs mb-6 leading-relaxed">
        The system path you requested is either reserved or does not resolve to an active workspace.
      </p>

      <button
        onClick={() => navigate('/')}
        className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 px-5 text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      >
        Return Home
      </button>
    </div>
  );
}
