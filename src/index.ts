import express from 'express';
import battleRoutes from './routes/battle';
import pokemonRoutes from './routes/pokemon';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use('/api', battleRoutes);
app.use('/api', pokemonRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
