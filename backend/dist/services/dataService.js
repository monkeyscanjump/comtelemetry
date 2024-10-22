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
exports.fetchDataForKey = fetchDataForKey;
exports.getData = getData;
const axios_1 = __importDefault(require("axios"));
const parseAndFilterEndpoints_1 = require("../helpers/parseAndFilterEndpoints");
const index_1 = __importDefault(require("@config/index"));
let data = {};
let requestCounter = 0;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function fetchDataForKey(key, endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            requestCounter++;
            const url = endpoint.endpoint.replace('${keys.address}', key.address);
            // Apply delay if requestCounter is a multiple of 10
            if (requestCounter % 10 === 0) {
                const delayTime = Math.floor(requestCounter / 10) * index_1.default.delayMs;
                console.log(`Applying delay of ${delayTime}ms for request number ${requestCounter}`);
                yield delay(delayTime);
            }
            const response = yield (0, axios_1.default)({
                method: endpoint.method,
                url,
                headers: endpoint.headers
            });
            if (!data[key.name])
                data[key.name] = {};
            // Parse data
            const parsedData = (0, parseAndFilterEndpoints_1.parseAndFilterEndpoints)({ [endpoint.name]: response.data });
            // Save response data
            data[key.name].address = key.address;
            data[key.name][endpoint.name] = parsedData;
            // Reset requestCounter every 100 requests
            if (requestCounter >= 100) {
                requestCounter = 0;
            }
        }
        catch (error) {
            console.error(`Error fetching data for ${key.name} from ${endpoint.endpoint}:`, error);
        }
    });
}
function getData() {
    return data;
}
