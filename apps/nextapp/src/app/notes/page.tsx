'use client';

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    title: 'Untitled Note',
    content: ''
  });
  const [saveStatus, setSaveStatus] = useState('');

  // Fetch notes from API
  useEffect(() => {
    fetchNotes();
  }, []);

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

  const createNewNote = () => {
    setCurrentNote({
      title: 'Untitled Note',
      content: ''
    });
  };

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

  const deleteNote = async (noteId: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      const res = await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="grid h-[calc(100vh-10rem)] grid-cols-12 divide-x">
      {/* Notes List Sidebar */}
      <div className="col-span-3 flex h-full flex-col">
        <div className="p-4 border-b">
          <Button className="w-full" onClick={createNewNote}>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          {notes.map((note) => (
            <div
              key={note._id}
              className={cn(
                "group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
                currentNote._id === note._id && "bg-muted"
              )}
            >
              <div 
                className="flex-1 cursor-pointer overflow-hidden"
                onClick={() => setCurrentNote(note)}
              >
                <h3 className="font-medium truncate">{note.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {note.content}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => note._id && deleteNote(note._id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="col-span-9 flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <Input
            value={currentNote.title}
            onChange={(e) => setCurrentNote({
              ...currentNote,
              title: e.target.value
            })}
            placeholder="Note title"
            variant="ghost"
            className="text-lg font-medium"
          />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {saveStatus}
            </span>
            <Button onClick={saveNote}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <textarea
            value={currentNote.content}
            onChange={(e) => setCurrentNote({
              ...currentNote,
              content: e.target.value
            })}
            placeholder="Start typing your note..."
            className="h-full w-full resize-none border-none bg-transparent p-0 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}