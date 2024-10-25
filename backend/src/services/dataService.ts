import axios from 'axios';
import { Key, Endpoint, Data } from '../types';
import { parseAndFilterEndpoints } from '../helpers/parseAndFilterEndpoints';
import config from '@config/index';
import { debounce } from '../../../shared/utils/debounce';

let data: Data = {};
const requestCounters: Map<string, number> = new Map();

function resetCounter(endpointName: string): void {
    requestCounters.set(endpointName, 1);
}

const debouncedFetch = debounce(async (url: string, method: string, headers: any) => {
    return axios({
        method,
        url,
        headers
    });
}, config.delayMs);

export async function fetchDataForKey(key: Key, endpoint: Endpoint) {
    try {
        const endpointName = endpoint.name;
        if (!requestCounters.has(endpointName)) {
            requestCounters.set(endpointName, 1);
        }

        // Reset requestCounter every 100 requests
        let requestCounter = requestCounters.get(endpointName);
        if (requestCounter === undefined || requestCounter >= 100) {
            resetCounter(endpointName);
            requestCounter = 1;
        }

        const url = endpoint.endpoint.replace('${keys.address}', key.address);

        let response;
        let debounceApplied = false;
        let debounceValue = 0;
        if (requestCounter % 10 === 0) {
            console.log(`Applying debounce for request number ${requestCounter} on endpoint ${endpointName}`);
            response = await debouncedFetch(url, endpoint.method, endpoint.headers);
            debounceApplied = true;
            debounceValue = config.delayMs * requestCounter;
        } else {
            response = await axios({
                method: endpoint.method,
                url,
                headers: endpoint.headers
            });
        }

        if (!data[key.name]) data[key.name] = {};

        // Parse data.
        const parsedData = parseAndFilterEndpoints({ [endpoint.name]: response.data });

        // Save response data to memory.
        data[key.name].address = key.address;
        data[key.name][endpoint.name] = parsedData;

        // Local function to update debounce values
        const updateDebounceValues = (obj: any, properties: string[]) => {
            properties.forEach(property => {
                const keys = property.split('.');
                let target = obj;
                keys.forEach((key, index) => {
                    if (!target[key]) {
                        target[key] = index === keys.length - 1 ? {} : {};
                    }
                    target = target[key];
                });
                target.debounceApplied = debounceApplied;
                target.debounceValue = debounceValue;
            });
        };

        // Add debounce information to stats, balance, and any other specified properties
        updateDebounceValues(data[key.name], ['stats', 'balance.balances']);

        // Increment requestCounter
        requestCounters.set(endpointName, requestCounter + 1);
    } catch (error) {
        console.error(`Error fetching data for ${key.name} from ${endpoint.endpoint}:`, error);
    }
}

export function getData() {
    return data;
}