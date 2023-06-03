import { Injectable } from '@nestjs/common';
import {
  EmbedDocumentsOptions,
  VectorDBClient,
} from '../vector-db-client.interface';
@Injectable()
export class QdrantAdapterService implements VectorDBClient {
  delete(indexName: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  describeIndexStats(indexName: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  embedDocuments(options: EmbedDocumentsOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
