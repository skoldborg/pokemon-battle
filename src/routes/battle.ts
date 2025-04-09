import express from 'express';
import { simulateBattle } from '../battle';
import { Pokemon } from '../types';
import logger from '../utils/logger';

const router = express.Router();

router.post('/battle', async (req, res) => {
  const team1: Pokemon[] = req.body.team1;
  const team2: Pokemon[] = req.body.team2;

  try {
    const result = await simulateBattle(team1, team2);
    res.json(result);
  } catch (error) {
    logger.error('Error simulating battle:', error);
    res.status(500).json({ error: 'Failed to simulate battle' });
  }
});

export default router;
