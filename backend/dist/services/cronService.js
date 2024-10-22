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
const index_1 = __importDefault(require("@config/index"));
const dataService_1 = require("./dataService");
function setupCronJobs(keys) {
    keys.forEach(key => {
        index_1.default.endpointList.forEach(endpoint => {
            node_cron_1.default.schedule(endpoint.cronTime, () => (0, dataService_1.fetchDataForKey)(key, endpoint));
        });
    });
}
function triggerAllJobs(keys) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const key of keys) {
            for (const endpoint of index_1.default.endpointList) {
                yield (0, dataService_1.fetchDataForKey)(key, endpoint);
            }
        }
    });
}
