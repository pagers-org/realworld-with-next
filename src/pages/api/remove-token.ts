import { deleteCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { 리얼_월드_키 } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    deleteCookie(리얼_월드_키, {
      req,
      res,
      path: '/',
    });
    return res.status(200).json({ message: 'Delete the Token' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
