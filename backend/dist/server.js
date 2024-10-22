"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("@config/index"));
const keyService_1 = require("./services/keyService");
const cronService_1 = require("./services/cronService");
const watchService_1 = require("./services/watchService");
const routes_1 = __importDefault(require("./routes"));
// Initial setup
(0, keyService_1.regenerateKeys)();
(0, cronService_1.setupCronJobs)((0, keyService_1.getKeys)());
(0, watchService_1.watchKeyFolder)();
// Express Server
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: `http://localhost:${index_1.default.frontendPort}` }));
// Use routes
app.use('/api', routes_1.default);
app.listen(index_1.default.port, () => {
    console.log(`Server running at http://localhost:${index_1.default.port}`);
});
