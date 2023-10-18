import type { NextApiRequest, NextApiResponse } from "next"
import homes from '../../../data/homes.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Intentionally trigger an exception
    // throw new Error('This is a manually triggered exception.');
    res.status(200).json({ message: 'Success', homes });
  } else {
    res.status(405).end(); // * IF HTTP Method not allowed.
  }
}