import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '@config/index';
import { regenerateKeys, getKeys } from './services/keyService';
import { setupCronJobs } from './services/cronService';
import { watchKeyFolder } from './services/watchService';
import routes from './routes';

// Initial setup
regenerateKeys();
setupCronJobs(getKeys());
watchKeyFolder();

// Express Server
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: `http://localhost:${config.frontendPort}` }));

// Use routes
app.use('/api', routes);

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});