import { Provider } from '@nestjs/common';
import { QdrantAdapterService } from '../qdrant-adapter.service.ts/qdrant-adapter.service.ts.service';
import { PineconeAdapterService } from '../pinecone-adapter/pinecone-adapter.service';
import { VectorDBClient } from '../vector-db-client.interface';

export const VectorAdapterProvider: Provider<VectorDBClient> = {
  provide: 'VECTOR_DB_CLIENT',
  useFactory: () => {
    const vectorDb = process.env.VECTOR_DB;
    if (vectorDb === 'qdrant') {
      return new QdrantAdapterService();
    } else if (vectorDb === 'pinecone') {
      return new PineconeAdapterService('apikey', 'environment');
    }
    throw new Error(`Invalid VECTOR_DB value: ${vectorDb}`);
  },
};
