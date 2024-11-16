// apps/nextapp/src/app/(protected)/notes/useNotes.ts
import { useState, useEffect } from 'react';

interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Custom hook for managing notes functionality.
 *
 * returns {object} - Exposes notes management logic and state:
 *  - notes: List of notes.
 *  - currentNote: The currently selected or being edited note.
 *  - saveStatus: Status of the save operation.
 *  - fetchNotes: Fetches notes from the API.
 *  - createNewNote: Creates a new empty note.
 *  - saveNote: Saves the current note to the API.
 *  - deleteNote: Deletes a note by ID.
 *  - setCurrentNote: Updates the current note state.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    title: 'Untitled Note',
    content: '',
  });
  const [saveStatus, setSaveStatus] = useState('');

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
      title: 'Untitled Note',
      content: '',
    });
  };

  /**
   * Saves the current note to the API and updates the notes list.
   */
  const saveNote = async () => {
    setSaveStatus('Saving...');
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentNote),
      });
      if (res.ok) {
        const newNote = await res.json();
        setNotes([newNote, ...notes]);
        setSaveStatus('Saved');
      } else {
        console.error('Failed to save note');
        setSaveStatus('Failed to save');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      setSaveStatus('Error saving');
    }
  };

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
        setNotes(notes.filter((note) => note._id !== noteId));
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

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
