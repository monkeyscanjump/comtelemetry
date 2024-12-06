"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const frontendPort = process.env.FRONTEND_PORT || 3000;
const backendPort = process.env.BACKEND_PORT || 3001;
const config = {
    keyFolder: path_1.default.join(process.env.HOME || process.env.USERPROFILE || '', '.commune', 'key'),
    port: backendPort,
    frontendPort: frontendPort,
    delayMs: parseInt(process.env.DELAY_MS || '250', 10),
    fetchInterval: parseInt(process.env.FETCH_INTERVAL || '60000', 10),
    allowedOrigins: [
        `http://localhost:${frontendPort}`,
        `192.168.50:${frontendPort}`,
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
    ]
};
exports.default = config;
