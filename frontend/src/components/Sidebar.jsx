import { useNavigate, useParams, Link } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { 
  FileText, 
  Trash2, 
  Plus, 
  Loader2, 
  X,
  Star,
  Pin
} from 'lucide-react';
import { useState } from 'react';

/**
 * Floating Sidebar panel. Displays notes directories, stars, and recents tab filters.
 */
export default function Sidebar({ isOpen, onClose }) {
  const { recentNotes, loading: recentsLoading, removeRecentNote } = useNotes();
  const { slug: activeSlug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recents'); // 'recents' or 'favorites'

  const handleCreateNote = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomSlug = '';
    for (let i = 0; i < 6; i++) {
      randomSlug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    navigate(`/${randomSlug}`);
    if (onClose) onClose();
  };

  const handleDeleteRecent = async (e, slugToDelete) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm(`Are you sure you want to delete note "/${slugToDelete}"?`)) {
      try {
        await noteService.deleteNote(slugToDelete);
        removeRecentNote(slugToDelete);
        if (activeSlug === slugToDelete) {
          navigate('/');
        }
      } catch (err) {
        alert(err.message || 'Failed to delete note');
      }
    }
  };

  const formatLastEdited = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Filter notes into subsets
  const favoriteNotes = recentNotes.filter(n => n.favorite);
  const regularNotes = recentNotes.filter(n => !n.favorite);
  const displayedNotes = activeTab === 'recents' ? recentNotes : favoriteNotes;

  return (
    <aside className={`fixed top-4 bottom-4 left-4 z-40 flex w-68 flex-col justify-between glass-sidebar rounded-2xl transition-transform duration-300 md:top-22 md:left-4 md:bottom-4 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      {/* Upper Navigation Pane */}
      <div className="flex flex-col flex-grow overflow-y-auto custom-scrollbar p-4">
        
        {/* Mobile Header (Close drawer button) */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="font-display font-bold text-sm tracking-tight">NoteNest Menu</span>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover cursor-pointer"
            id="mobile-sidebar-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Button: Quick Create */}
        <button
          onClick={handleCreateNote}
          className="mb-4 flex items-center justify-center gap-2 w-full rounded-xl bg-brand-primary text-bg-primary py-2.5 px-4 font-sans font-medium text-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          id="sidebar-create-note-button"
        >
          <Plus className="h-4 w-4" />
          <span>New Workspace</span>
        </button>

        {/* Tab Segmented Control */}
        <div className="grid grid-cols-2 p-0.5 mb-4 rounded-lg bg-hover border border-border/40 select-none">
          <button
            onClick={() => setActiveTab('recents')}
            className={`py-1.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'recents'
                ? 'bg-bg-primary text-text-primary shadow-2xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            id="tab-recents-trigger"
          >
            All Notes
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-1.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-bg-primary text-text-primary shadow-2xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            id="tab-favorites-trigger"
          >
            Starred
          </button>
        </div>

        {/* Notes Folders lists */}
        <div className="flex-1">
          {recentsLoading && recentNotes.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Pinned Section: Active when viewing "Recents" tab */}
              {activeTab === 'recents' && favoriteNotes.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-1.5 px-2">
                    <Pin className="h-3 w-3 text-text-primary rotate-45" />
                    <span className="text-[9px] font-bold tracking-wider text-text-muted uppercase">
                      Pinned
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {favoriteNotes.map((note) => (
                      <li key={`sidebar-pinned-${note.slug}`}>
                        <Link
                          to={`/${note.slug}`}
                          onClick={onClose}
                          className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all duration-250 ${
                            activeSlug === note.slug
                              ? 'bg-hover text-text-primary font-medium border-l-2 border-text-primary rounded-l-none'
                              : 'text-text-secondary hover:bg-hover/60 hover:text-text-primary'
                          }`}
                          id={`sidebar-pinned-item-${note.slug}`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-3.5 w-3.5 shrink-0 text-text-muted" />
                            <span className="truncate">{note.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                            <Star className="h-3 w-3 text-text-primary fill-text-primary group-hover:hidden" />
                            <button
                              onClick={(e) => handleDeleteRecent(e, note.slug)}
                              className="hidden group-hover:inline-flex p-1 rounded hover:bg-hover text-text-secondary hover:text-danger cursor-pointer"
                              title="Delete note"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standard List */}
              <div>
                {activeTab === 'recents' && favoriteNotes.length > 0 && (
                  <div className="mb-1.5 px-2">
                    <span className="text-[9px] font-bold tracking-wider text-text-muted uppercase">
                      All Notes
                    </span>
                  </div>
                )}
                
                {displayedNotes.length > 0 ? (
                  <ul className="space-y-0.5">
                    {(activeTab === 'recents' ? regularNotes : displayedNotes).map((note) => (
                      <li key={`sidebar-recent-${note.slug}`}>
                        <Link
                          to={`/${note.slug}`}
                          onClick={onClose}
                          className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all duration-250 ${
                            activeSlug === note.slug
                              ? 'bg-hover text-text-primary font-medium border-l-2 border-text-primary rounded-l-none'
                              : 'text-text-secondary hover:bg-hover/60 hover:text-text-primary'
                          }`}
                          id={`sidebar-item-${note.slug}`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-3.5 w-3.5 shrink-0 text-text-muted" />
                            <span className="truncate">{note.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                            {note.favorite && (
                              <Star className="h-3 w-3 text-text-primary fill-text-primary group-hover:hidden" />
                            )}
                            <span className={`text-[9px] text-text-muted font-sans ${note.favorite ? 'hidden' : 'group-hover:hidden'}`}>
                              {formatLastEdited(note.lastEdited)}
                            </span>
                            <button
                              onClick={(e) => handleDeleteRecent(e, note.slug)}
                              className="hidden group-hover:inline-flex p-1 rounded hover:bg-hover text-text-secondary hover:text-danger cursor-pointer"
                              title="Delete note"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-xs text-text-muted font-sans">
                    {activeTab === 'favorites' ? 'No starred notes.' : 'No notes.'}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Footer Branding segment */}
      <div className="p-4 border-t border-border/50 bg-hover/20 shrink-0 text-center rounded-b-2xl">
        <span className="text-[9px] text-text-muted font-sans select-none">
          Designed by Apple • v1.2.0
        </span>
      </div>
      
    </aside>
  );
}

// Import fallback noteService reference for deletions in sidebar
import { noteService } from '../services/noteService';
