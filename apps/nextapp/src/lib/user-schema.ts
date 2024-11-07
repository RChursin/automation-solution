import { Schema, models, model } from 'mongoose';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: [30, 'Username cannot be more than 30 characters'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = models.User || model('User', userSchema);