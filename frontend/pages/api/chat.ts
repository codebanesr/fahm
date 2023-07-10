import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history, user_dir } = req.body;

  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = 'http://localhost:8080/_api/chat';
  const headers = {
    accept: '*/*',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    question,
    history,
    user_dir,
  });
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
