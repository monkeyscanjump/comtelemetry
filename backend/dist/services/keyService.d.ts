import { Key } from '../types';
/**
 * Regenerates the keys by reading the key folder and parsing the JSON files.
 * Updates the global `keys` array with valid keys.
 */
export declare function regenerateKeys(): void;
/**
 * Retrieves the current list of keys.
 * @returns {Key[]} The list of keys.
 */
export declare function getKeys(): Key[];
