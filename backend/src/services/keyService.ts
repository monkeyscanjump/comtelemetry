import fs from 'fs';
import path from 'path';
import config from '@comalt/config';
import { Key } from '../types';

let keys: Key[] = [];

/**
 * Regenerates the keys by reading the key folder and parsing the JSON files.
 * Updates the global `keys` array with valid keys.
 */
export function regenerateKeys() {
  try {
    // Check if the key folder exists
    if (!fs.existsSync(config.keyFolder)) {
      console.error(`Key folder does not exist: ${config.keyFolder}`);
      keys = [];
      return;
    }

    const files = fs.readdirSync(config.keyFolder);
    keys = files
      .filter(file => path.extname(file) === '.json')
      .flatMap(file => {
        const filePath = path.join(config.keyFolder, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const parsedFile = JSON.parse(content);
          const parsedFileData = parsedFile?.data && JSON.parse(parsedFile.data);
          const key: Key = {
            name: parsedFileData?.path || '',
            address: parsedFileData?.ss58_address || ''
          };

          // Only return valid keys
          if (key.name && key.address) {
            return [key];
          } else {
            console.error(`Invalid key in file ${file}:`, key);
            return [];
          }
        } catch (error) {
          console.error(`Error parsing file ${file}:`, error);
          return [];
        }
      });
  } catch (error) {
    console.error('Error reading key folder:', error);
    keys = [];
  }
}

/**
 * Retrieves the current list of keys.
 * @returns {Key[]} The list of keys.
 */
export function getKeys(): Key[] {
  return keys;
}