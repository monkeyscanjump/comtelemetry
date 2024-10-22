"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchKeyFolder = watchKeyFolder;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("@config/index"));
const keyService_1 = require("./keyService");
const cronService_1 = require("./cronService");
const debounce_1 = require("../helpers/debounce");
const debouncedRegenerateKeysAndSetupCronJobs = (0, debounce_1.debounce)(() => {
    (0, keyService_1.regenerateKeys)();
    (0, cronService_1.setupCronJobs)((0, keyService_1.getKeys)());
}, 100);
function watchKeyFolder() {
    fs_1.default.watch(index_1.default.keyFolder, (eventType, filename) => {
        if (filename && path_1.default.extname(filename) === '.json') {
            debouncedRegenerateKeysAndSetupCronJobs();
        }
    });
}
