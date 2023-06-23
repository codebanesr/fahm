import { OpenAIChat, PromptLayerOpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';

// temperature: 0.9,
// promptLayerApiKey: process.env.AZURE_OPENAI_API_KEY,
// azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
// azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
// azureOpenAIApiDeploymentName:
//   process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
// azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
function getModel() {
  const useAzureOpenAI = process.env.USE_AZURE_OPENAI === 'true';
  if (useAzureOpenAI) {
    return new OpenAIChat({
      temperature: 0.9,
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
      azureOpenAIApiDeploymentName: 'fahm',
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
      modelName: 'gpt-3.5',
    });
  } else {
    return new ChatOpenAI({
      temperature: 0,
      modelName: 'gpt-3.5-turbo', // Change this to "gpt-4" if you have access
      streaming: true,
    });
  }
}

export default getModel;
