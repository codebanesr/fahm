import { Injectable, Logger } from '@nestjs/common';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
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
    this.client.init({
      apiKey,
      environment,
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
