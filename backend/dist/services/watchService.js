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
exports.watchService = watchService;
exports.watchKeyFolder = watchKeyFolder;
const fs_1 = __importDefault(require("fs"));
const debounce_1 = require("../../../shared/utils/debounce");
const config_1 = __importDefault(require("../../../shared/config"));
const dataService_1 = require("./dataService");
const keyService_1 = require("./keyService");
const cronService_1 = require("./cronService");
const debouncedFetchDataForKey = (0, debounce_1.debounce)((key, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dataService_1.fetchDataForKey)(key, endpoint);
}), 3000); // Adjust the debounce delay as needed
/**
 * Watches the service for the given keys and endpoints, fetching data with a debounce.
 * @param keys - The list of keys to watch.
 * @param endpoints - The list of endpoints to watch.
 */
function watchService(keys, endpoints) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const key of keys) {
            for (const endpoint of endpoints) {
                yield debouncedFetchDataForKey(key, endpoint);
            }
        }
    });
}
/**
 * Watches the key folder for changes and re-runs the necessary setup when a file is added or removed.
 */
function watchKeyFolder() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyFolder = config_1.default.keyFolder;
        if (!keyFolder) {
            console.error('Key folder path is not defined in the config');
            return;
        }
        console.log(`Watching key folder at ${keyFolder}...`);
        const debouncedSetup = (0, debounce_1.debounce)(() => __awaiter(this, void 0, void 0, function* () {
            console.log('Debounced setup triggered');
            (0, keyService_1.regenerateKeys)();
            (0, cronService_1.setupCronJobs)((0, keyService_1.getKeys)());
        }), 200);
        fs_1.default.watch(keyFolder, (eventType, filename) => {
            if (filename) {
                console.log(`File ${filename} changed with event type ${eventType}`);
                debouncedSetup();
            }
            else {
                console.error('Filename is null');
            }
        });
    });
}
