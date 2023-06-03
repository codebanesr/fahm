import { Injectable, Logger } from '@nestjs/common';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeAdapterService } from 'src/db-utils/pinecone-adapter/pinecone-adapter.service';
import { CreateIndexDTO } from './dto/create-index.dto';

@Injectable()
export class DocumentIngestionService {
  constructor(private readonly pineconeService: PineconeAdapterService) {}
  private logger = new Logger(DocumentIngestionService.name);

  async run(options: CreateIndexDTO) {
    try {
      const { directoryPath, pineconeIndexName, pineconeNamespace } = options;

      /*load raw docs from all files in the directory */
      const directoryLoader = new DirectoryLoader(directoryPath, {
        '.pdf': (path) => new PDFLoader(path),
      });

      const rawDocs = await directoryLoader.load();

      /* Split text into chunks */
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docs = await textSplitter.splitDocuments(rawDocs);
      this.logger.log('split docs', docs);

      this.logger.log('creating vector store...');

      this.pineconeService.embedDocuments({
        docs,
        vectorIndexName: pineconeIndexName,
        vectorNamespace: pineconeNamespace,
      });

      this.logger.log('ingestion complete');

      return { success: true };
    } catch (error) {
      this.logger.error('Failed to ingest your data', error);
      throw new Error('Failed to ingest your data');
    }
  }
}
