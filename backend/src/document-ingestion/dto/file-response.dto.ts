import { Document } from 'mongoose';
import { File } from '../schema/file.schema';

export class FileResponseDto implements Omit<File, keyof Document> {
  identifier: string;
  originalName: string;
  filePath: string;
  file_base64: string;
}
