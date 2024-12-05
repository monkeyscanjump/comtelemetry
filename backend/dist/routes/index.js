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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataService_1 = require("../services/dataService");
const cronService_1 = require("../services/cronService");
const keyService_1 = require("../services/keyService");
const router = (0, express_1.Router)();
/**
 * GET /data
 * Retrieves the collected data.
 */
router.get('/data', (req, res) => {
    try {
        const data = (0, dataService_1.getData)();
        res.json(data);
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});
/**
 * POST /trigger-jobs
 * Triggers all cron jobs immediately.
 */
router.post('/trigger-jobs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cronService_1.triggerAllJobs)((0, keyService_1.getKeys)());
        res.json({ message: 'All jobs triggered successfully' });
    }
    catch (error) {
        console.error('Error triggering jobs:', error);
        res.status(500).json({ error: 'Failed to trigger jobs' });
    }
}));
exports.default = router;
