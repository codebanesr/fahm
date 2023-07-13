import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import {
  RemoveDocumentsByFilter,
  VectorDBClient,
} from 'src/db-utils/vector-db-client.interface';
import { FileService } from './file.service';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from 'src/chat/schema/api-key.schema';
import { Model } from 'mongoose';

@Injectable()
export class DocumentIngestionService {
  constructor(
    @Inject('VECTOR_DB_CLIENT') private readonly vectorDbClient: VectorDBClient,
    private readonly fileService: FileService,
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>,
  ) {}

  stringToBase64(input: string): string {
    const buffer = Buffer.from(input, 'utf8');
    return buffer.toString('base64');
  }

  async getAllUploadedFiles(email: string) {
    return this.fileService.findAll({ email });
  }

  async removeDocumentsByFilter(
    file_base64: string,
    options: RemoveDocumentsByFilter,
  ) {
    await this.fileService.removeFileByBase64(file_base64);
    return this.vectorDbClient.removeDocumentsByFilter({
      filter: { file_base64 },
      indexName: process.env.PINECONE_INDEX_NAME,
      namespace: process.env.PINECONE_NS,
    });
  }

  async removeDocumentsByApiKey(apiKey: string) {
    // delete all files that were uploaded using this api key
    await this.fileService.removeFilesForApiKey(apiKey);
    return this.vectorDbClient.removeDocumentsByFilter({
      filter: { apiKey },
      indexName: process.env.PINECONE_INDEX_NAME,
      namespace: process.env.PINECONE_NS,
    });
  }

  async ingestUserDocuments(file: Express.Multer.File, identifier?: string) {
    if (!identifier) {
      throw new BadRequestException(
        'Master Directory has currently been disabled, you should be either logged in or using an api key to access this resource',
      );
    }

    const exists = await this.apiKeyModel.exists({ key: identifier });
    if (!exists?._id) {
      throw new BadRequestException(
        'This api key is not valid, please create one from the dashboard',
      );
    }

    const search_context = identifier
      ? this.stringToBase64(identifier)
      : this.stringToBase64('master_dir');

    const file_base64 = this.stringToBase64(file.filename);
    const loader = new PDFLoader(file.path, { splitPages: true });
    const rawDocs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    docs.forEach((doc) => {
      doc.metadata.search_context = search_context;
      doc.metadata.apiKey = identifier;
      doc.metadata.file_base64 = file_base64;
    });

    // embedDocuments -> addDocumentsToIndex
    await this.vectorDbClient.addDocumentsToIndex({
      docs,
      vectorIndexName: process.env.PINECONE_INDEX_NAME,
      vectorNamespace: process.env.PINECONE_NS,
      id: file.originalname,
    });

    console.log({
      search_context,
      message: 'Finished indexing',
      index: process.env.PINECONE_INDEX_NAME,
      namespace: process.env.PINECONE_NS,
    });

    return this.fileService.create({
      identifier,
      originalName: file.originalname,
      filePath: file.path,
      file_base64,
    });
  }
}
