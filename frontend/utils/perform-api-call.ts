export async function performAPICall(
    endpoint: string,
  method: string,
  body?: any,
): Promise<any> {
  try {
    const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
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
