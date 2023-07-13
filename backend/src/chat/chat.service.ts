import { Injectable, OnModuleInit } from '@nestjs/common';
import { PineconeClient } from '@pinecone-database/pinecone';
import { generateApiKey } from 'generate-api-key';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from 'src/utils/makechain';
import { PINECONE_INDEX_NAME } from 'src/utils/pinecone/pinecone';
import { initPinecone } from 'src/utils/pinecone/pinecone-client';
import { stringToBase64 } from 'src/utils/string2base64';

@Injectable()
export class ChatService implements OnModuleInit {
  pinecone: PineconeClient;
  async onModuleInit() {
    this.pinecone = await initPinecone();
  }

  async getAIResponse(question, user_dir, history) {
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
    const index = this.pinecone.Index(PINECONE_INDEX_NAME);

    /* create vectorstore */
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: process.env.PINECONE_NS,
        filter: {
          search_context: {
            $in: [stringToBase64(user_dir), stringToBase64('master_dir')],
          },
        },
      },
    );

    console.log({ history });
    // Create chain
    const chain = makeChain(vectorStore);
    // Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history.join('\n') || [],
    });

    return response;
  }

  async generateApiKey(username: string) {
    generateApiKey({
      method: 'uuidv5',
      name: 'production app',
      namespace: '0f3819f3-b417-4c4c-b674-853473800265',
      prefix: username.slice(0, 5),
    });
  }
}
