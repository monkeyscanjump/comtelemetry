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
const config_1 = __importDefault(require("@comalt/config"));
const debounce_1 = require("../../../shared/utils/debounce");
let data = {};
// Create an Axios instance with an empty config object
const axiosInstance = axios_1.default.create({});
/**
 * Custom type guard function to check if an error is an AxiosError.
 * @param error - The error to check.
 * @returns {boolean} - True if the error is an AxiosError, false otherwise.
 */
function isAxiosError(error) {
    return error && error.isAxiosError === true;
}
/**
 * Helper function to check if an error is retryable.
 * @param error - The error to check.
 * @returns {boolean} - True if the error is retryable, false otherwise.
 */
function isRetryableError(error) {
    return (isAxiosError(error) &&
        error.response &&
        error.response.status === 500 &&
        !error.config.__isRetryRequest);
}
// Set up Axios interceptor for retry logic
axiosInstance.interceptors.response.use(response => response, (error) => __awaiter(void 0, void 0, void 0, function* () {
    if (isRetryableError(error)) {
        const config = error.config;
        // Add a retry count to prevent infinite loops
        config.__retryCount = config.__retryCount || 0;
        if (config.__retryCount < 2) { // Retry maximum 2 times
            config.__retryCount += 1;
            console.log(`Retrying request for URL: ${config.url} (Attempt ${config.__retryCount})`);
            return axiosInstance.request(config);
        }
    }
    return Promise.reject(error);
}));
// Debounce wrapper function with headers as an optional parameter
const debouncedFetch = (0, debounce_1.debounce)((url, method, headers) => __awaiter(void 0, void 0, void 0, function* () {
    return axiosInstance({ method, url, headers });
}), config_1.default.delayMs);
/**
 * Fetches data for a given key and endpoint.
 * @param key - The key for which to fetch data.
 * @param endpoint - The endpoint from which to fetch data.
 */
function fetchDataForKey(key, endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const endpointName = endpoint.name;
            const url = endpoint.endpoint.replace('${keys.address}', key.address);
            const response = yield debouncedFetch(url, endpoint.method, endpoint.headers);
            // Initialize the data object for the key if not already done
            data[key.name] = data[key.name] || { address: key.address };
            // Parse the response data
            const parsedData = (0, parseAndFilterEndpoints_1.parseAndFilterEndpoints)({
                [endpoint.name]: response.data,
            });
            // Save the parsed data to the data object
            data[key.name][endpointName] = parsedData;
        }
        catch (error) {
            console.error(`Error fetching data for ${key.name} from ${endpoint.endpoint}:`, error);
        }
    });
}
/**
 * Retrieves the collected data.
 * @returns {Data} - The collected data.
 */
function getData() {
    return data;
}
