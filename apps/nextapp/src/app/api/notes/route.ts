// apps/nextapp/src/app/api/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth/options';
import dbConnect from '../../../lib/mongodb';
import { Note } from '../../../lib/note-schema';

/**
 * Helper function to validate the session.
 * Ensures the user is authenticated.
 */
async function validateSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session.user;
}

/**
 * GET /api/notes
 * Fetches all notes for the authenticated user.
 */
export async function GET() {
  try {
    const user = await validateSession();
    await dbConnect();

    const notes = await Note.find({ userId: user.id })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

/**
 * POST /api/notes
 * Creates a new note or updates an existing note for the authenticated user.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await validateSession();
    await dbConnect();

    const data = await request.json();

    // Check if the note already exists (has an `_id`)
    if (data._id) {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: data._id, userId: user.id },
        { title: data.title, content: data.content, updatedAt: new Date() },
        { new: true }
      );

      if (!updatedNote) {
        return NextResponse.json({ error: 'Note not found or unauthorized' }, { status: 404 });
      }

      return NextResponse.json(updatedNote, { status: 200 });
    }

    // Otherwise, create a new note
    const newNote = await Note.create({
      userId: user.id,
      title: data.title || 'Untitled Note',
      content: data.content || '',
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create or update note' }, { status: 500 });
  }
}