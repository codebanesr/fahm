import { Schema, Document } from 'mongoose';

export interface File extends Document {
  email: string;
  originalName: string;
  filePath: string;
  file_base64: string;
}

export const FileSchema = new Schema<File>(
  {
    email: String,
    originalName: String,
    filePath: String,
    file_base64: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
