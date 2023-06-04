import { Injectable } from '@nestjs/common';
import {
  EmbedDocumentsOptions,
  VectorDBClient,
} from '../vector-db-client.interface';
import { QdrantClient } from '@qdrant/qdrant-js';
import { QdrantVectorStore } from 'langchain/vectorstores/qdrant';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

@Injectable()
export class QdrantAdapterService implements VectorDBClient {
  private client: QdrantClient;

  constructor() {
    this.client = new QdrantClient({ url: process.env.QDrantUrl });
  }

  delete(indexName: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  describeIndexStats(indexName: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async embedDocuments({
    docs,
    vectorIndexName,
    vectorNamespace,
  }: EmbedDocumentsOptions): Promise<void> {
    const embeddings = new OpenAIEmbeddings();

    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      client: this.client,
      url: process.env.QDRANT_URL,
      collectionName: vectorNamespace,
      collectionConfig: {
        vectors: {
          distance: 'Cosine',
          size: parseInt(process.env.VECTOR_SIZE, 10) || 1536,
        },
      },
    });
  }
}
