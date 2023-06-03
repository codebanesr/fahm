import { Injectable, Logger } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PineconeService } from 'src/pinecone/pinecone.service';

@Injectable()
export class DocumentIngestionService {
  constructor(private readonly pineconeService: PineconeService) {}
  private logger = new Logger(DocumentIngestionService.name);

  async run(options: {
    filePath: string;
    pineconeIndexName: string;
    pineconeNamespace: string;
  }): Promise<void> {
    try {
      const pinecone = await this.pineconeService.getPineconeClient();
      const { filePath, pineconeIndexName, pineconeNamespace } = options;

      /*load raw docs from all files in the directory */
      const directoryLoader = new DirectoryLoader(filePath, {
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
      /*create and store the embeddings in the vectorStore*/
      const embeddings = new OpenAIEmbeddings();
      const index = pinecone.Index(pineconeIndexName);

      //embed the PDF documents
      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: pineconeNamespace,
        textKey: 'text',
      });

      this.logger.log('ingestion complete');
    } catch (error) {
      this.logger.error('Failed to ingest your data', error);
      throw new Error('Failed to ingest your data');
    }
  }
}
