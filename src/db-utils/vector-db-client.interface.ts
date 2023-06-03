import { Document } from 'langchain/dist/document';

/**
 * This interface represents a client for interacting with a Vector Database.
 * Implementations of this interface provide methods for deleting an index, describing index statistics,
 * and embedding documents into the Vector Database.
 */
export interface VectorDBClient {
  /**
   * Deletes an index in the Vector Database.
   * @param indexName The name of the index to delete.
   * @returns A Promise that resolves when the index is deleted.
   */
  delete(indexName: string): Promise<void>;

  /**
   * Retrieves statistics for an index in the Vector Database.
   * @param indexName The name of the index to get statistics for.
   * @returns A Promise that resolves with the index statistics.
   */
  describeIndexStats(indexName: string): Promise<any>;

  /**
   * Embeds documents into the Vector Database.
   * @param options The options for embedding the documents, including the documents to embed and the index details.
   * @returns A Promise that resolves when the embedding is complete.
   */
  embedDocuments(options: EmbedDocumentsOptions): Promise<void>;
}

export interface EmbedDocumentsOptions {
  docs: Document<Record<string, any>>[];
  vectorIndexName: string;
  vectorNamespace: string;
}
