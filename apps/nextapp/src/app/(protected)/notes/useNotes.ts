// apps/nextapp/src/app/(protected)/notes/useNotes.ts
import { useState, useEffect, useRef, useCallback } from 'react';

interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Custom hook for managing notes functionality, including:
 * - Auto-saving every 3 minutes.
 * - Saving on page unload.
 * - Checking if a note already exists to update it.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    title: '',
    content: '',
  });
  const [saveStatus, setSaveStatus] = useState('');
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Fetches notes from the API and updates the notes state.
   */
  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  /**
   * Creates a new empty note and sets it as the current note.
   */
  const createNewNote = () => {
    setCurrentNote({
      title: '',
      content: '',
    });
  };

/**
 * Saves the current note to the API and updates the notes list.
 * Uses `navigator.sendBeacon` for saving during `beforeunload`.
 */
const saveNote = useCallback(async (useBeacon = false) => {
  if (!currentNote.title.trim() && !currentNote.content.trim()) {
    console.log('Skipping save for empty note.');
    setSaveStatus('');
    return;
  }

  const saveData = JSON.stringify(currentNote);

  if (useBeacon && currentNote._id) {
    // Use `sendBeacon` for saving on `beforeunload`
    const url = `/api/notes/${currentNote._id}`;
    const blob = new Blob([saveData], { type: 'application/json' });
    const isSent = navigator.sendBeacon(url, blob);
    if (isSent) {
      console.log('Note saved via sendBeacon.');
      return;
    }
  }

  // Regular save flow
  setSaveStatus('Saving...');
  try {
    const method = currentNote._id ? 'PUT' : 'POST';
    const url = currentNote._id ? `/api/notes/${currentNote._id}` : '/api/notes';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: saveData,
    });

    if (res.ok) {
      const updatedNote = await res.json();
      setNotes((prevNotes) =>
        prevNotes.find((note) => note._id === updatedNote._id)
          ? prevNotes.map((note) =>
              note._id === updatedNote._id ? updatedNote : note
            )
          : [updatedNote, ...prevNotes]
      );
      setCurrentNote(updatedNote); // Update the current note with the saved version
      setSaveStatus('Saved');
    } else {
      console.error('Failed to save note');
      setSaveStatus('Failed to save');
    }
  } catch (error) {
    console.error('Error saving note:', error);
    setSaveStatus('Error saving');
  }
}, [currentNote]);

  /**
   * Deletes a note by its ID from the API and updates the notes list.
   *
   * param {string} noteId - ID of the note to delete.
   */
  const deleteNote = async (noteId: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      const res = await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        if (currentNote._id === noteId) {
          setCurrentNote({ title: '', content: '' }); // Clear the current note if it's deleted
        }
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  /**
   * Handles auto-saving notes every 3 minutes.
   */
  useEffect(() => {
    saveIntervalRef.current = setInterval(() => {
      console.log('Auto-saving note...');
      saveNote();
    }, 3 * 60 * 1000); // 3 minutes

    return () => {
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
    };
  }, [saveNote]);

  /**
   * Saves the note when the user closes the browser or navigates away.
   */
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Saving note before page unload...');
      saveNote();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
  

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveNote]);

  // Fetch notes on initial render
  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    currentNote,
    saveStatus,
    fetchNotes,
    createNewNote,
    saveNote,
    deleteNote,
    setCurrentNote,
  };
}