import fs from 'fs';
import { debounce } from '../../../shared/utils/debounce';
import config from '../../../shared/config';
import { fetchDataForKey } from './dataService';
import { Key, Endpoint } from '../types';
import { regenerateKeys, getKeys } from './keyService';
import { setupCronJobs } from './cronService';

const debouncedFetchDataForKey = debounce(async (key: Key, endpoint: Endpoint) => {
  await fetchDataForKey(key, endpoint);
}, 3000); // Adjust the debounce delay as needed

/**
 * Watches the service for the given keys and endpoints, fetching data with a debounce.
 * @param keys - The list of keys to watch.
 * @param endpoints - The list of endpoints to watch.
 */
export async function watchService(keys: Key[], endpoints: Endpoint[]) {
  for (const key of keys) {
    for (const endpoint of endpoints) {
      await debouncedFetchDataForKey(key, endpoint);
    }
  }
}

/**
 * Watches the key folder for changes and re-runs the necessary setup when a file is added or removed.
 */
export async function watchKeyFolder() {
  const keyFolder = config.keyFolder;

  if (!keyFolder) {
    console.error('Key folder path is not defined in the config');
    return;
  }

  console.log(`Watching key folder at ${keyFolder}...`);

  const debouncedSetup = debounce(async () => {
    console.log('Debounced setup triggered');
    regenerateKeys();
    setupCronJobs(getKeys());
  }, 200);

  fs.watch(keyFolder, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} changed with event type ${eventType}`);
        debouncedSetup();
    } else {
        console.error('Filename is null');
    }
  });
}
