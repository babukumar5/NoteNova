import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * A beautiful, Apple-style modal dialog for confirming high-consequence operations.
 */
export default function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
  
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onCancel}
        className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl dark:border-slate-850 dark:bg-slate-900 transition-all duration-300 animate-[in_0.2s_ease-out] select-none">
        
        {/* Warning Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-red-500/10 dark:bg-red-500/15 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight">
            {title || 'Are you sure?'}
          </h3>
        </div>

        {/* Message body */}
        <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {message || 'This action cannot be undone. Please confirm to proceed.'}
        </p>

        {/* Buttons Action bar */}
        <div className="flex justify-end gap-2.5">
          <button
            onClick={onCancel}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-850 transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            Confirm Delete
          </button>
        </div>

      </div>
    </div>
  );
}
