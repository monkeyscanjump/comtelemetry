import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '@comalt/config';
import { regenerateKeys, getKeys } from './services/keyService';
import { setupCronJobs } from './services/cronService';
import { watchKeyFolder } from './services/watchService';
import routes from './routes';

async function initializeServer() {
  try {
    // Initial setup
    regenerateKeys();
    const communeKeys = getKeys();

    setupCronJobs(communeKeys);
    watchKeyFolder();

    // Create an Express application
    const app = express();

    // Middleware setup
    app.use(bodyParser.json());
    app.use(cors({ origin: `http://localhost:${config.frontendPort}` }));

    // Use routes
    app.use('/api', routes);

    // Error handling middleware
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Unhandled error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    // Start the server
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Error during server initialization:', error);
    process.exit(1); // Exit the process with a failure code
  }
}

initializeServer();
