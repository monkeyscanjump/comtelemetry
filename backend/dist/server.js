"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("@comalt/config"));
const keyService_1 = require("./services/keyService");
const cronService_1 = require("./services/cronService");
const watchService_1 = require("./services/watchService");
const routes_1 = __importDefault(require("./routes"));
function initializeServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Initial setup
            (0, keyService_1.regenerateKeys)();
            const communeKeys = (0, keyService_1.getKeys)();
            (0, cronService_1.setupCronJobs)(communeKeys);
            (0, watchService_1.watchKeyFolder)();
            // Create an Express application
            const app = (0, express_1.default)();
            // Middleware setup
            app.use(body_parser_1.default.json());
            app.use((0, cors_1.default)({ origin: `http://localhost:${config_1.default.frontendPort}` }));
            // Use routes
            app.use('/api', routes_1.default);
            // Error handling middleware
            app.use((err, req, res, next) => {
                console.error('Unhandled error:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
            // Start the server
            app.listen(config_1.default.port, () => {
                console.log(`Server running at http://localhost:${config_1.default.port}`);
            });
        }
        catch (error) {
            console.error('Error during server initialization:', error);
            process.exit(1); // Exit the process with a failure code
        }
    });
}
initializeServer();
