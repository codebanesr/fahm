import { Document } from 'langchain/dist/document';

export interface RemoveDocumentsByIdOptions {
  indexName: string;
  ids: string[];
  namespace: string;
}

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
   * Seems to me like this creates a new index and then adds documents to it, and i will use it as such
   * @param options The options for embedding the documents, including the documents to embed and the index details.
   * @returns A Promise that resolves when the embedding is complete.
   */
  embedDocuments(options: EmbedDocumentsOptions): Promise<void>;

  /**
   * Adds documents to the vector database index.
   *
   * @param {EmbedDocumentsOptions} options - The options for adding documents.
   * @returns {Promise<void>} - A Promise that resolves when the documents are successfully added.
   */
  addDocumentsToIndex(options: EmbedDocumentsOptions): Promise<void>;

  /**
   * Removes documents from the specified index by their IDs.
   *
   * @param options - An object containing the following properties:
   *   - indexName: A string specifying the name of the index from which to remove documents.
   *   - ids: An array of strings representing the IDs of the documents to be removed.
   *   - namespace: A string specifying the namespace in which the documents reside.
   *
   * @returns A promise that resolves when the removal is complete.
   */
  removeDocumentsById(options: RemoveDocumentsByIdOptions): Promise<void>;
}

export interface EmbedDocumentsOptions {
  docs: Document<Record<string, any>>[];
  vectorIndexName: string;
  vectorNamespace: string;
  id?: string;
}
