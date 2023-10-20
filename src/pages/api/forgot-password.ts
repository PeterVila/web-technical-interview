import type { NextApiRequest, NextApiResponse } from "next"

import users from '../../../data/users.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username } = req.body;
      const user = users.find((user) => user.email === username);
      // Validate the user exists. 
      if (user) {
        res.status(200).json({ message: 'Success' });
      } else { // Give vague reason.
        res.status(401).json({ error: 'It looks like something went wrong. Please try again.' });
      }
      // ? Simulate a server error (HTTP 500) by throwing an error
      // throw new Error('Simulated server error');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // * IF HTTP Method not allowed.
  }
};

