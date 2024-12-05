import { Key, Endpoint, Data } from '../types';
/**
 * Fetches data for a given key and endpoint.
 * @param key - The key for which to fetch data.
 * @param endpoint - The endpoint from which to fetch data.
 */
export declare function fetchDataForKey(key: Key, endpoint: Endpoint): Promise<void>;
/**
 * Retrieves the collected data.
 * @returns {Data} - The collected data.
 */
export declare function getData(): Data;
