// apps/nextapp/src/app/(protected)/notes/page.tsx
'use client';

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNotes } from './useNotes';

/**
 * Notes Page Component
 * Renders the notes list and editor, utilizing the `useNotes` hook for logic.
 */
export default function NotesPage() {
  const {
    notes,
    currentNote,
    saveStatus,
    createNewNote,
    saveNote,
    deleteNote,
    setCurrentNote,
  } = useNotes();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 divide-x">
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
                title: e.target.value,
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
                content: e.target.value,
              })}
              placeholder="Start typing your note..."
              className="h-full w-full resize-none border-none bg-transparent p-0 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background p-6">
        <div className="container">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
