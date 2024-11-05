import { Schema, models, model } from 'mongoose';

export interface INote {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      default: 'Untitled Note',
      maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    content: {
      type: String,
      default: '', // Allow empty content by default
    },
  },
  {
    timestamps: true,
  },
);

export const Note = models.Note || model('Note', noteSchema);
