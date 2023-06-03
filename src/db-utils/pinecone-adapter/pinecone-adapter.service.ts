import { Injectable, Logger } from '@nestjs/common';
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import {
  EmbedDocumentsOptions,
  VectorDBClient,
} from '../vector-db-client.interface';

@Injectable()
export class PineconeAdapterService implements VectorDBClient {
  private client: PineconeClient;
  private logger = new Logger(PineconeAdapterService.name);

  constructor(apiKey: string, environment: string) {
    this.client = new PineconeClient();
    this.client
      .init({
        apiKey,
        environment,
      })
      .then((data) => {
        this.logger.log('initialized pinecone client', data);
      })
      .catch((error) => {
        this.logger.error('Failed to initialize pinecone client', error);
      });
  }

  async embedDocuments({
    docs,
    vectorIndexName,
    vectorNamespace,
  }: EmbedDocumentsOptions): Promise<void> {
    const embeddings = new OpenAIEmbeddings();
    const index = this.client.Index(vectorIndexName);

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: vectorNamespace,
      textKey: 'text',
    });
  }

  async delete(indexName: string): Promise<void> {
    await this.client.deleteIndex({ indexName });
  }

  async describeIndexStats(indexName: string): Promise<any> {
    return this.client.describeIndex({ indexName });
  }
}
