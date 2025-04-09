import express, { Request, Response } from 'express';
import path from 'path';
import { Pokemon } from '../types';

const router = express.Router();

router.get('/pokemon', (req: Request, res: Response<Pokemon[]>) => {
  res.sendFile(path.join(__dirname, '../../data/pokemon.json'));
});

export default router;
