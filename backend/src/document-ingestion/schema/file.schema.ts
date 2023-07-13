import { Schema, Document } from 'mongoose';

export interface File extends Document {
  // its called identifier because it can be either of email or apiKey based on which version you are using
  // for fahm/frontend it will be email, for integration this will be apikey
  identifier: string;
  originalName: string;
  filePath: string;
  file_base64: string;
}

export const FileSchema = new Schema<File>(
  {
    identifier: String,
    originalName: String,
    filePath: String,
    file_base64: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
