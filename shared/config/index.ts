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

const config = {
  keyFolder: path.join(process.env.HOME || process.env.USERPROFILE || '', '.commune', 'key'),
  port: process.env.BACKEND_PORT || 3001,
  frontendPort: process.env.FRONTEND_PORT || 3000,
  delayMs: parseInt(process.env.DELAY_MS || '3000', 10),
  fetchInterval: parseInt(process.env.FETCH_INTERVAL || '60000', 10),
  endpointList: [
    {
      name: 'balance',
      endpoint: 'https://stats.communex.ai/api/accounts?account=${keys.address}',
      cronTime: '33 */1 * * *',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'stats',
      endpoint: 'https://api.comstats.org/validators/${keys.address}',
      cronTime: '42 */1 * * *',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ] as Endpoint[]
};

export default config;