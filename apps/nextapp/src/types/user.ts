// apps/nextapp/src/types/user.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string; // Added email field
  password: string;
  createdAt: Date;
  updatedAt: Date;
}