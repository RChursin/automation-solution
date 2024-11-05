import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { Note } from '../../../lib/note-schema';

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    const noteData = {
      title: data.title || 'Untitled Note',
      content: data.content || '',
    };

    const note = await Note.create(noteData);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    if (!data._id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    const note = await Note.findByIdAndUpdate(
      data._id,
      {
        title: data.title || 'Untitled Note',
        content: data.content || '',
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}