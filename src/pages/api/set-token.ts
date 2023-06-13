import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { 리얼_월드_키, 하루 } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { user } = req.body;

  try {
    setCookie(리얼_월드_키, user, {
      req,
      res,
      maxAge: 하루,
      path: '/',
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({ message: 'Save the Token' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
