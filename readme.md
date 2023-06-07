# Knowledge base app

This app is a knowledge base for a particular domain. It has a backend to ingest documents and store in a vector database.  The frontend uses GPT-4 and Langchain to build a chatbot interface over these documents.

## [Backend](backend/README.md)

We are developing a SaaS system that involves the following components:

Ingesting Reference Data: We have a substantial amount of reference data that needs to be ingested into the vector database. This reference data is static and will not be modified. It serves as a foundational dataset for our system.  

User Document Upload: Our SaaS system allows users to upload their own documents, which will be indexed and made searchable alongside the reference data. Each user will have their own isolated space or boundary for their uploaded documents. This ensures data separation and privacy between different users.

Multi-Tenant Architecture: Our SaaS system is designed with a multi-tenant architecture, enabling multiple users to access the system concurrently. Each user will have secure and separate access to their uploaded documents while being able to search and interact with the reference data. This architecture ensures scalability, performance, and data privacy for our users.  

## Solution

To achieve the functionality described above we use the following components:

1. Pinecone - Vector database to store documents as embeddings. It will have separate namespaces for reference data and each user.

2. Upload API - To upload user documents to their namespace.

3. Search API - To search across reference data and user's documents.

4. Isolation - Each user can access only their own namespace, ensuring privacy.

5. Concurrent access - The system can handle access from multiple users concurrently.

## [Frontend](frontend/README.md)

The frontend uses GPT-4 and LangChain to build a chatbot interface.
The steps are:

1. Add PDF files to `docs` folder.

2. Run `npm run ingest` to embed the docs.

3. Check Pinecone dashboard to verify embeddings are added. 

4. Run `npm run dev` to start the app.

5. Ask questions in the chat interface.

The tech stack used is:

- LangChain 
- Pinecone
- Typescript
- Openai 
- Next.js

For troubleshooting, check the issues section of this repo.