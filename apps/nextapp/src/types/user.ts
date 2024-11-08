// apps/nextapp/src/types/user.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;  // Add this
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}