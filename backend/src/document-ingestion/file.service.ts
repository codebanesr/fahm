import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File as FileMeta } from './schema/file.schema';
import { Document, FilterQuery } from 'mongoose';

@Injectable()
export class FileService {
  constructor(
    @InjectModel('File') private readonly fileModel: Model<FileMeta>,
  ) {}

  async findAll(filter: FilterQuery<FileMeta>): Promise<FileMeta[]> {
    return this.fileModel.find(filter).exec();
  }

  async removeFileByBase64(file_base64: string) {
    return this.fileModel.deleteOne({ file_base64 });
  }

  async create(file: Omit<FileMeta, keyof Document>): Promise<FileMeta> {
    const newFile = new this.fileModel(file);
    return newFile.save();
  }
}
