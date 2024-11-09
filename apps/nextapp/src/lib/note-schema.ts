// apps/nextapp/src/lib/note-schema.ts
import { Schema, models, model } from 'mongoose';

export interface INote {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      default: 'Untitled Note',
      maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    content: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Add compound index for better query performance
noteSchema.index({ userId: 1, updatedAt: -1 });

export const Note = models.Note || model('Note', noteSchema);