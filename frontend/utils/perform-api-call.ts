import { ApiKey } from '@/types/api-key';

export async function performAPICall(
  url: string,
  method: string,
  body?: any,
): Promise<ApiKey | undefined> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method} API`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    // Handle the error or show an error message to the user
  }
}
