// pages/api/auth/[...auth0].js
import { Session, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

async function upsertUser(url: string, user: any) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(user);
  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: body,
  });
  return response.json();
}

const afterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) => {
  const user = session.user || (<any>req).user;
  if (user) {
    await upsertUser(`${process.env.API_URL}/users`, user);
  }
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end();
    }
  },
});
