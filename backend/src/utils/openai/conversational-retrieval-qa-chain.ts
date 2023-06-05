import { OpenAI } from 'langchain/llms/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { BaseLLM } from 'langchain/dist/llms/base';

/**
 * Creates a conversational QA chain from an LLM and vector store.
 * @param vectorStore The vector store to use for document retrieval
 * @param model The language model to use for question answering
 * @returns The constructed QA chain
 */
export function makeChain(vectorStore: PineconeStore, model: BaseLLM) {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true,
    },
  );
  return chain;
}

/**
 * Creates an OpenAI language model instance.
 * @returns The OpenAI language model
 */
export function createModel(openAIApiKey: string) {
  return new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey,
  });
}

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.     
  
  Chat History:       
  
  {chat_history}      
  
  Follow Up Input: {question}      
  
  Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.       
  
  If you don't know the answer, just say you don't know. DO NOT try to make up an answer.       
  
  If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.       
  
  {context}       
  
  Question: {question}       
  
  Helpful answer in markdown:`;
