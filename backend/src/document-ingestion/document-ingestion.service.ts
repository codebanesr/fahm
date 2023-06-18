import { Inject, Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import {
  RemoveDocumentsByFilter,
  VectorDBClient,
} from 'src/db-utils/vector-db-client.interface';
import { FileService } from './file.service';

@Injectable()
export class DocumentIngestionService {
  constructor(
    @Inject('VECTOR_DB_CLIENT') private readonly vectorDbClient: VectorDBClient,
    private readonly fileService: FileService,
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

  async ingestUserDocuments(file: Express.Multer.File, email?: string) {
    const search_context = email
      ? this.stringToBase64(email)
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
      email,
      originalName: file.originalname,
      filePath: file.path,
      file_base64,
    });
  }
}
