```sh
docker build -t hr_management_api .
```


---

```yaml
version: '3'

services:
  your-service:
    build:
      context: .
      dockerfile: Dockerfile
    env_file:
      - ./path/to/env.file
```



----

## Data exploration for closed source information
We are developing a SaaS system that involves the following components:

Ingesting Reference Data: We have a substantial amount of reference data that needs to be ingested into the vector database. This reference data is static and will not be modified. It serves as a foundational dataset for our system.

User Document Upload: Our SaaS system allows users to upload their own documents, which will be indexed and made searchable alongside the reference data. Each user will have their own isolated space or boundary for their uploaded documents. This ensures data separation and privacy between different users.

Multi-Tenant Architecture: Our SaaS system is designed with a multi-tenant architecture, enabling multiple users to access the system concurrently. Each user will have secure and separate access to their uploaded documents while being able to search and interact with the reference data. This architecture ensures scalability, performance, and data privacy for our users.

By incorporating these requirements, our SaaS system will facilitate efficient ingestion of reference data, seamless user document upload, and secure multi-tenant functionality. This will empower our users to leverage the reference data and their own uploaded documents for various search and analysis purposes."

---
## Solution in mind
---
To achieve the functionality you described while using Pinecone, you can follow these steps:

1. Set up Namespaces: Create separate namespaces within Pinecone to differentiate between the reference data and user-uploaded documents. You can have one namespace for the reference data (e.g., "reference_data") and dynamically create namespaces for each user to isolate their uploaded documents (e.g., "user1_documents", "user2_documents", etc.).

2. Ingest Reference Data: Ingest your reference data into the "reference_data" namespace using Pinecone's ingestion API. This will load the static dataset into Pinecone's vector database.

3. Handle User Document Upload: When a user uploads a document, create a new namespace dynamically for that user's documents (e.g., "userX_documents"). Ingest the user's document into their respective namespace using Pinecone's ingestion API.

4. Perform Similarity Search: To perform a similarity search, use the search API provided by Pinecone. When a user submits a search query, specify the namespace(s) where the search should be performed. This allows you to search within the reference data and the user's specific namespace to find relevant results.

5. User Isolation and Security: By using separate namespaces for each user, you achieve data separation and privacy. Each user can only access their own namespace, ensuring that their uploaded documents remain isolated from other users' data.

6. Multi-Tenant Access: Pinecone supports concurrent access from multiple users through its API. Users can interact with the system independently, querying and retrieving results based on their own uploaded documents and the reference data.

By following these steps and leveraging Pinecone's features such as namespaces, ingestion API, and search API, you can implement the desired functionality within your SaaS system. Remember to refer to the Pinecone documentation for detailed information on how to use the specific APIs and features provided by Pinecone.


---

Pseudo code for the above implementation

```typescript
import Pinecone from 'pinecone-client';

// Initialize Pinecone client
const pinecone = new Pinecone({ apiKey: 'YOUR_API_KEY' });

// Namespaces
const referenceDataNamespace = 'reference_data';

// Ingest reference data
async function ingestReferenceData(vectors: number[][], ids: string[]) {
  await pinecone.upsert(referenceDataNamespace, vectors, ids);
}

// User Document Upload
async function uploadUserDocument(userId: string, vectors: number[][], ids: string[]) {
  const userNamespace = `user_${userId}_documents`;
  await pinecone.upsert(userNamespace, vectors, ids);
}

// Perform Similarity Search
async function performSimilaritySearch(queryVector: number[], namespaces: string[]) {
  const searchResults = await pinecone.query(namespaces, queryVector);
  return searchResults;
}

// Example Usage
async function main() {
  // Ingest reference data
  const referenceDataVectors = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const referenceDataIds = ['ref1', 'ref2', 'ref3'];
  await ingestReferenceData(referenceDataVectors, referenceDataIds);

  // Upload user document
  const userVectors = [[2, 3, 4], [5, 6, 7]];
  const userId = 'user1';
  const userDocumentIds = ['doc1', 'doc2'];
  await uploadUserDocument(userId, userVectors, userDocumentIds);

  // Perform similarity search
  const queryVector = [3, 4, 5];
  const namespaces = [referenceDataNamespace, `user_${userId}_documents`];
  const searchResults = await performSimilaritySearch(queryVector, namespaces);
  console.log('Search Results:', searchResults);
}

// Run the example
main().catch(console.error);
```

Explanation:

- `vectors` represent the numerical representations or embeddings of your data points. In the code, `referenceDataVectors` and `userVectors` hold the vectors for the reference data and the user documents, respectively. Each vector is an array of numbers that captures the characteristics of the corresponding data point.

- `ids` are unique identifiers associated with each data point. In the code, `referenceDataIds` and `userDocumentIds` hold the IDs for the reference data and the user documents, respectively. IDs can be any string that uniquely identifies each data point.

- In the `ingestReferenceData` function, the `upsert` method is used to ingest the reference data vectors into the `reference_data` namespace along with their corresponding IDs.

- In the `uploadUserDocument` function, the `upsert` method is used to upload the user document vectors into a dynamically created namespace specific to each user (`user_X_documents`) along with their corresponding IDs.

- In the `performSimilaritySearch` function, the `query` method is used to perform a similarity search. The `queryVector` represents the vector of the query point, and `namespaces` specify the namespaces to search within.

- In the example usage (`main` function), we ingest reference data, upload user documents, and perform a similarity search. The search results are printed to the console.

Remember to replace `'YOUR_API_KEY'` with your actual Pinecone API key.