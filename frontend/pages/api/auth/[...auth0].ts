// pages/api/auth/[...auth0].js
import { Session, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) => {
  const user = session.user || (<any>req).user;
  if(user) {
    
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
