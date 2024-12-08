/* apps/nextapp/src/app/(protected)/notes/page.tsx */

'use client';

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNotes } from './useNotes';
import styles from './notes.module.css';

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

  const handleSave = () => {
    saveNote();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`${styles.header} bg-background/95`}>
        <div className="container mx-auto">
          <h2 className={styles.title}>Notes</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-6 h-full flex gap-6">
          {/* Notes Sidebar */}
          <aside className={`${styles.notesSidebar} w-full md:w-1/4`}>
            <div className={styles.newNoteContainer}>
              <Button className="w-full" onClick={createNewNote}>
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
            
            <div className={styles.notesList}>
              {notes.map((note) => (
                <div
                  key={note._id}
                  className={cn(
                    'group hover:bg-muted/50', // hover class in JSX
                    styles.noteListItem,
                    currentNote._id === note._id && styles.activeNote
                  )}
                >
                  <div className={styles.noteContent} onClick={() => setCurrentNote(note)}>
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{note.content}</p>
                  </div>
                  {/* Add group-hover:opacity-100 in JSX */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${styles.deleteButton} group-hover:opacity-100`}
                    onClick={() => note._id && deleteNote(note._id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </aside>

          {/* Note Editor */}
          <div className={`${styles.noteEditor} flex-1 flex flex-col bg-background`}>
            {/* Apply bg-background/60 in JSX */}
            <div className={`${styles.editorHeader} bg-background/60`}>
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
                <span className="text-sm text-muted-foreground">{saveStatus}</span>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className={styles.editorArea}>
              <textarea
                value={currentNote.content}
                onChange={(e) => setCurrentNote({
                  ...currentNote,
                  content: e.target.value,
                })}
                placeholder="Start typing your note..."
                className={styles.textarea}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
