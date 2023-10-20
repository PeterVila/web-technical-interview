import type { NextApiRequest, NextApiResponse } from "next"

import users from '../../../data/users.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      const user = users.find((user) => user.email === username);

      if (user) {
        if (user.password === password) {
          res.status(200).json({ message: 'Success', authorized: user });
        } else { // ? For non-demonstration purposes = res.status(401).json({ error: 'Authentication failed' });
          res.status(401).json({ error: 'User not found' });
        }
      } else { // ? For non-demonstration purposes = res.status(401).json({ error: 'Authentication failed' });
        res.status(401).json({ error: 'Password not found' });
      }

      // * Simulate a server error (HTTP 500) by throwing an error
      // * throw new Error('Simulated server error');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // * IF HTTP Method not allowed.
  }
};

