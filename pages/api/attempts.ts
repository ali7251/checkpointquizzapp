import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Question from '../../models/Question';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const questions = await Question.find({});
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des questions' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newQuestion = new Question(req.body);
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(400).json({ error: 'Erreur lors de l\'ajout de la question' });
    }
  }
}
