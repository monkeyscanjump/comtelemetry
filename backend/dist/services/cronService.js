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
exports.setupCronJobs = setupCronJobs;
exports.triggerAllJobs = triggerAllJobs;
const node_cron_1 = __importDefault(require("node-cron"));
const config_1 = __importDefault(require("@comalt/config"));
const dataService_1 = require("./dataService");
const cronJobs = new Map();
/**
 * Stops and removes existing cron jobs for a given key name.
 * @param keyName - The name of the key whose cron jobs should be stopped.
 */
function stopExistingJobs(keyName) {
    const existingJobs = cronJobs.get(keyName);
    if (existingJobs) {
        console.log('Stopping existing jobs for key:', keyName);
        existingJobs.forEach(job => job.stop());
        cronJobs.delete(keyName);
    }
}
/**
 * Schedules new cron jobs for a given key.
 * @param key - The key for which to schedule cron jobs.
 */
function scheduleJobsForKey(key) {
    const jobs = config_1.default.endpointList.map(endpoint => {
        console.log('Scheduling job for key:', key.name);
        return node_cron_1.default.schedule(endpoint.cronTime, () => (0, dataService_1.fetchDataForKey)(key, endpoint));
    });
    cronJobs.set(key.name, jobs);
}
/**
 * Sets up cron jobs for a list of keys. Stops existing jobs and schedules new ones.
 * @param keys - The list of keys for which to set up cron jobs.
 */
function setupCronJobs(keys) {
    keys.forEach(key => {
        stopExistingJobs(key.name);
        scheduleJobsForKey(key);
    });
}
/**
 * Triggers all jobs for a list of keys immediately.
 * @param keys - The list of keys for which to trigger jobs.
 */
function triggerAllJobs(keys) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const key of keys) {
            for (const endpoint of config_1.default.endpointList) {
                console.log('Triggering job for key:', key.name);
                yield (0, dataService_1.fetchDataForKey)(key, endpoint);
            }
        }
    });
}
