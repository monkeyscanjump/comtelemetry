import axios from 'axios';
import { Key, Endpoint, Data } from '../types';
import { parseAndFilterEndpoints } from '../helpers/parseAndFilterEndpoints';
import config from '@config/index';

let data: Data = {};
let requestCounter = 0;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchDataForKey(key: Key, endpoint: Endpoint) {
    try {
        requestCounter++;
        const url = endpoint.endpoint.replace('${keys.address}', key.address);

        // Apply delay if requestCounter is a multiple of 10
        if (requestCounter % 10 === 0) {
            const delayTime = Math.floor(requestCounter / 10) * config.delayMs;
            console.log(`Applying delay of ${delayTime}ms for request number ${requestCounter}`);
            await delay(delayTime);
        }

        const response = await axios({
            method: endpoint.method,
            url,
            headers: endpoint.headers
        });
        if (!data[key.name]) data[key.name] = {};

        // Parse data
        const parsedData = parseAndFilterEndpoints({ [endpoint.name]: response.data });

        // Save response data
        data[key.name].address = key.address;
        data[key.name][endpoint.name] = parsedData;

        // Reset requestCounter every 100 requests
        if (requestCounter >= 100) {
            requestCounter = 0;
        }
    } catch (error) {
        console.error(`Error fetching data for ${key.name} from ${endpoint.endpoint}:`, error);
    }
}

export function getData() {
    return data;
}