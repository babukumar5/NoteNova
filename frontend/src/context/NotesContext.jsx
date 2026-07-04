import { createContext, useContext } from 'react';
import { useRecentNotes } from '../hooks/useRecentNotes';

const NotesContext = createContext();

/**
 * Context Provider to share the state of recent notes across the sidebar,
 * note view pages, and deletion triggers.
 */
export const NotesProvider = ({ children }) => {
  const recentsManager = useRecentNotes();

  return (
    <NotesContext.Provider value={recentsManager}>
      {children}
    </NotesContext.Provider>
  );
};

/**
 * Custom hook to access shared notes states (recent list, add/remove triggers).
 */
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
