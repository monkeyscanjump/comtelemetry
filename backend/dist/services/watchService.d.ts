import { Key, Endpoint } from '../types';
/**
 * Watches the service for the given keys and endpoints, fetching data with a debounce.
 * @param keys - The list of keys to watch.
 * @param endpoints - The list of endpoints to watch.
 */
export declare function watchService(keys: Key[], endpoints: Endpoint[]): Promise<void>;
/**
 * Watches the key folder for changes and re-runs the necessary setup when a file is added or removed.
 */
export declare function watchKeyFolder(): Promise<void>;
