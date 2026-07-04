import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { noteService } from '../services/noteService';
import { useDebounce } from '../hooks/useDebounce';
import Editor from '../components/Editor';
import ConfirmationModal from '../components/ConfirmationModal';
import { 
  Star, 
  Trash2, 
  Copy, 
  Check, 
  Loader2, 
  Cloud, 
  AlertCircle,
  Eye,
  WifiOff,
  Clock
} from 'lucide-react';

/**
 * NoteView Page - Workspace formatted inside a premium minimal card container.
 */
export default function NoteView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addRecentNote, removeRecentNote, refreshRecents } = useNotes();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [views, setViews] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error', 'offline'
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [savedLabel, setSavedLabel] = useState('');
  const [stats, setStats] = useState({ characters: 0, words: 0 });

  const lastSavedTitle = useRef('');
  const lastSavedContent = useRef('');
  const isFirstLoad = useRef(true);
  const pendingSaveRef = useRef(null);

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedContent = useDebounce(content, 1000);

  // Load Note
  useEffect(() => {
    let active = true;
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      isFirstLoad.current = true;
      try {
        const res = await noteService.getNote(slug);
        if (res.success && active) {
          setTitle(res.data.title);
          setContent(res.data.content);
          setFavorite(res.data.favorite);
          setViews(res.data.views);
          
          lastSavedTitle.current = res.data.title;
          lastSavedContent.current = res.data.content;
          setLastSavedTime(new Date(res.data.updatedAt));
          
          addRecentNote(slug);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load note.');
        }
      } finally {
        if (active) {
          setLoading(false);
          setTimeout(() => {
            isFirstLoad.current = false;
          }, 150);
        }
      }
    };

    fetchNote();

    return () => {
      active = false;
    };
  }, [slug, addRecentNote]);

  // Save Note API handler
  const saveNoteData = useCallback(async (saveTitle, saveContent) => {
    if (!navigator.onLine) {
      setSaveStatus('offline');
      pendingSaveRef.current = { title: saveTitle, content: saveContent };
      return;
    }

    setSaveStatus('saving');
    try {
      const res = await noteService.updateNote(slug, {
        title: saveTitle,
        content: saveContent,
      });
      if (res.success) {
        lastSavedTitle.current = res.data.title;
        lastSavedContent.current = res.data.content;
        setLastSavedTime(new Date());
        setSaveStatus('saved');
        pendingSaveRef.current = null;
        refreshRecents();
      }
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
      pendingSaveRef.current = { title: saveTitle, content: saveContent };
    }
  }, [slug, refreshRecents]);

  // Monitor debounced values
  useEffect(() => {
    if (isFirstLoad.current) return;

    const titleChanged = debouncedTitle !== lastSavedTitle.current;
    const contentChanged = debouncedContent !== lastSavedContent.current;

    if (!titleChanged && !contentChanged) return;

    saveNoteData(debouncedTitle, debouncedContent);
  }, [debouncedTitle, debouncedContent, saveNoteData]);

  // Force Save trigger
  const handleForceSave = () => {
    if (saveStatus === 'saving') return;
    saveNoteData(title, content);
  };

  // Online / Offline handlers
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (pendingSaveRef.current) {
        saveNoteData(pendingSaveRef.current.title, pendingSaveRef.current.content);
      } else {
        setSaveStatus('saved');
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      setSaveStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [saveNoteData]);

  // Auto retry on connection failure
  useEffect(() => {
    if (saveStatus !== 'error' || isOffline) return;

    const retryInterval = setInterval(() => {
      if (pendingSaveRef.current && navigator.onLine) {
        saveNoteData(pendingSaveRef.current.title, pendingSaveRef.current.content);
      }
    }, 6000);

    return () => clearInterval(retryInterval);
  }, [saveStatus, isOffline, saveNoteData]);

  // Save elapsed time counter
  useEffect(() => {
    if (!lastSavedTime) {
      setSavedLabel('');
      return;
    }

    const calculateElapsedTime = () => {
      const diffMs = Date.now() - lastSavedTime.getTime();
      const diffSecs = Math.floor(diffMs / 1000);

      if (diffSecs < 10) {
        setSavedLabel('Saved just now');
      } else if (diffSecs < 60) {
        setSavedLabel(`Saved ${diffSecs}s ago`);
      } else {
        const mins = Math.floor(diffSecs / 60);
        setSavedLabel(`Saved ${mins}m ago`);
      }
    };

    calculateElapsedTime();
    const timer = setInterval(calculateElapsedTime, 5000);

    return () => clearInterval(timer);
  }, [lastSavedTime]);

  // Favorite toggle
  const handleToggleFavorite = async () => {
    const nextFavState = !favorite;
    setFavorite(nextFavState);
    try {
      await noteService.updateNote(slug, { favorite: nextFavState });
      refreshRecents();
    } catch (err) {
      setFavorite(!nextFavState);
    }
  };

  // Copy Note Link
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy link failed:', err);
    }
  };

  // Delete Note Confirmed
  const handleDeleteConfirm = async () => {
    try {
      await noteService.deleteNote(slug);
      removeRecentNote(slug);
      setIsDeleteModalOpen(false);
      navigate('/');
    } catch (err) {
      alert(err.message || 'Failed to delete note');
    }
  };

  // Estimate Reading Time
  const calculateReadingTime = () => {
    if (stats.words === 0) return '0 min read';
    const mins = Math.ceil(stats.words / 200);
    return `${mins} min read`;
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-text-secondary">
        <Loader2 className="h-6 w-6 animate-spin mb-3 text-text-primary" />
        <p className="text-xs font-sans font-medium">Opening workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center select-none">
        <AlertCircle className="h-8 w-8 text-danger mb-3" />
        <h2 className="font-display font-bold text-base mb-1">Could not open workspace</h2>
        <p className="font-sans text-xs text-text-muted max-w-sm mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-xl bg-brand-primary text-bg-primary py-2 px-4 text-xs font-semibold hover:bg-brand-hover cursor-pointer"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-6 md:px-10 md:py-8 max-w-4xl w-full mx-auto">
      
      {/* Dynamic Header actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 shrink-0">
        
        {/* Editable Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled note"
          className="flex-1 bg-transparent border-none text-2xl font-display font-extrabold focus:outline-none text-text-primary placeholder-border"
          id="editor-title-input"
        />

        {/* Header Action controls */}
        <div className="flex items-center gap-1.5 select-none">
          
          {/* Autosave monochrome status label */}
          <div className="flex items-center gap-1.5 text-xs text-text-muted mr-3 shrink-0">
            {saveStatus === 'saving' && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-text-primary" />
                <span className="font-sans font-medium">Saving...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Cloud className="h-3.5 w-3.5 text-text-primary" />
                <span className="font-sans font-medium">{savedLabel || 'Saved'}</span>
              </>
            )}
            {saveStatus === 'offline' && (
              <>
                <WifiOff className="h-3.5 w-3.5 text-text-primary" />
                <span className="font-sans font-medium text-text-primary">Offline</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-text-primary animate-pulse" />
                <span className="font-sans font-medium">Syncing...</span>
              </>
            )}
          </div>

          {/* Views count Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-border text-xs font-semibold text-text-secondary bg-hover/20">
            <Eye className="h-3.5 w-3.5" />
            <span className="font-sans">{views}</span>
          </div>

          {/* Star favorite toggle (Monochrome Star) */}
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              favorite 
                ? 'bg-active border-border text-text-primary' 
                : 'border-border hover:bg-hover text-text-secondary'
            }`}
            title={favorite ? 'Remove Favorite' : 'Star Note'}
            id="editor-star-toggle"
          >
            <Star className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} />
          </button>

          {/* Copy URL share */}
          <button
            onClick={handleCopyUrl}
            className="p-2 rounded-xl border border-border hover:bg-hover text-text-secondary transition-all cursor-pointer"
            title="Copy Note link"
            id="editor-copy-url"
          >
            {copySuccess ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>

          {/* Deletion Trigger */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2 rounded-xl border border-border text-text-secondary hover:text-danger hover:bg-hover transition-all cursor-pointer"
            title="Delete Note"
            id="editor-delete-note"
          >
            <Trash2 className="h-4 w-4" />
          </button>

        </div>
      </div>

      {/* TipTap Rich Editor */}
      <div className="flex-1 flex flex-col min-h-0">
        <Editor
          content={content}
          onChange={setContent}
          onSaveShortcut={handleForceSave}
          onStatsChange={setStats}
          placeholder="Start writing..."
        />
      </div>

      {/* Minimal Footer metadata */}
      <footer className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] text-text-muted font-sans select-none shrink-0">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{calculateReadingTime()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{stats.words} words</span>
          <span>•</span>
          <span>{stats.characters} characters</span>
        </div>
      </footer>

      {/* Confirmation Dialog Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Workspace note?"
        message={`Are you sure you want to permanently delete note "/${slug}"? This note will be removed from MongoDB and cannot be restored.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

    </div>
  );
}
