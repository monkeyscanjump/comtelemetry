"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    keyFolder: path_1.default.join(process.env.HOME || process.env.USERPROFILE || '', '.commune', 'key'),
    port: process.env.BACKEND_PORT || 3001,
    frontendPort: process.env.FRONTEND_PORT || 3000,
    delayMs: parseInt(process.env.DELAY_MS || '250', 10),
    fetchInterval: parseInt(process.env.FETCH_INTERVAL || '60000', 10),
    endpointList: [
        {
            name: 'balance',
            endpoint: 'https://stats.communex.ai/api/accounts?account=${keys.address}',
            cronTime: '27 */1 * * *',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        },
        {
            name: 'stats',
            endpoint: 'https://api.comstats.org/validators/${keys.address}',
            cronTime: '27 */1 * * *',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    ]
};
exports.default = config;
