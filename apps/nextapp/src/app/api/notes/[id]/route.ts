import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { Note } from '../../../../lib/note-schema';

// DELETE note by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Define params as a Promise
) {
  const { id: noteId } = await context.params; // Await and destructure params

  try {
    await dbConnect();

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Note deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}

// GET single note by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Define params as a Promise
) {
  const { id: noteId } = await context.params; // Await and destructure params

  try {
    await dbConnect();

    const note = await Note.findById(noteId);

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

// UPDATE note by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Define params as a Promise
) {
  const { id: noteId } = await context.params; // Await and destructure params

  try {
    await dbConnect();
    const data = await request.json();

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title: data.title || 'Untitled Note',
        content: data.content || '',
      },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}