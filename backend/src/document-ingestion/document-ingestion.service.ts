import { Inject, Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { VectorDBClient } from 'src/db-utils/vector-db-client.interface';

@Injectable()
export class DocumentIngestionService {
  constructor(
    @Inject('VECTOR_DB_CLIENT') private readonly vectorDbClient: VectorDBClient,
  ) {}

  stringToBase64(input: string): string {
    const buffer = Buffer.from(input, 'utf8');
    return buffer.toString('base64');
  }

  async ingestUserDocuments(file: Express.Multer.File, email?: string) {
    const search_context = email
      ? this.stringToBase64(email)
      : this.stringToBase64('master_dir');
    const loader = new PDFLoader(file.path, { splitPages: true });
    const rawDocs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    docs.forEach((doc) => {
      doc.metadata.search_context = search_context;
    });

    await this.vectorDbClient.embedDocuments({
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
  }
}
