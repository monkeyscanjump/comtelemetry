import path from 'path';

interface Endpoint {
  name: string;
  endpoint: string;
  cronTime: string;
  method: string;
  headers: {
    Accept: string;
    'Content-Type': string;
  };
}

const frontendPort = process.env.FRONTEND_PORT || 3000;
const backendPort = process.env.BACKEND_PORT || 3001;

const config = {
  keyFolder: path.join(process.env.HOME || process.env.USERPROFILE || '', '.commune', 'key'),
  port: backendPort,
  frontendPort: frontendPort,
  delayMs: parseInt(process.env.DELAY_MS || '250', 10),
  fetchInterval: parseInt(process.env.FETCH_INTERVAL || '60000', 10),
  allowedOrigins: [
    `http://localhost:${frontendPort}`,
    `192.168.21:${frontendPort}`,
    `192.168.89:${frontendPort}`,
    `192.168.16:${frontendPort}`
  ],
  endpointList: [
    {
      name: 'balance',
      endpoint: 'https://stats.communex.ai/api/accounts?account=${keys.address}',
      cronTime: '15 */1 * * *',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'stats',
      endpoint: 'https://api.comstats.org/validators/${keys.address}',
      cronTime: '15 */1 * * *',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ] as Endpoint[]
};

export default config;
