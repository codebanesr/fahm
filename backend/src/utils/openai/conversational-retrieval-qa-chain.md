## Usage
```ts
import { makeChain, createModel } from './openai-qa-chain';
import { PineconeStore } from 'langchain/vectorstores';

async function start() {
  // Create an OpenAI model instance
  const model = createModel();
  
  // Create a PineconeStore to use for retrieval
  const store = new PineconeStore({ /* options */ }); 
  
  // Create the QA chain 
  const chain = makeChain(store, model);
  
  // Get a response from the chain 
  const response = await chain.execute({
    prompt: 'Hello! How are you today?',
    response: 'I'm well, thanks! How about yourself?',    
  });
  
  console.log(response.sourceDocuments); // Retrieved documents
  console.log(response.answer); // Response from model 
}

start();
```