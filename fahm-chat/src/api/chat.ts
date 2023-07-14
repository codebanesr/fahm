export interface ChatResponse {
  text: string;
  sourceDocuments: Array<{ [key: string]: any }>; // Adjust the type accordingly
}

export async function makeChatRequest(
  inputMessage: string,
  messages: { message: string; type: string }[],
  endpoint: string,
) {
  const headers = {
    accept: '*/*',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    question: inputMessage,
    history: messages.map((m) => m.message),
    user_dir: 'yourapikeyhere',
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data: ChatResponse = await response.json();
    return data;
    // Process the response data here
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  }
}
