// apps/nextapp/src/app/api/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth/options';
import dbConnect from '../../../lib/mongodb';
import { Note } from '../../../lib/note-schema';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('Current session:', session); // Debug log
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const notes = await Note.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .lean();

    console.log('Found notes:', notes); // Debug log
    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Create note session:', session); // Debug log
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const data = await request.json();
    console.log('Creating note with data:', { ...data, userId: session.user.id }); // Debug log

    const noteData = {
      userId: session.user.id,
      title: data.title || 'Untitled Note',
      content: data.content || '',
    };

    const note = await Note.create(noteData);
    console.log('Created note:', note); // Debug log
    
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}