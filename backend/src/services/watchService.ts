import { debounce } from '../../../shared/utils/debounce';
import { fetchDataForKey } from './dataService';
import { Key, Endpoint } from '../types';

const debouncedFetchDataForKey = debounce(async (key: Key, endpoint: Endpoint) => {
    await fetchDataForKey(key, endpoint);
}, 3000); // Adjust the debounce delay as needed

export async function watchService(keys: Key[], endpoints: Endpoint[]) {
    for (const key of keys) {
        for (const endpoint of endpoints) {
            await debouncedFetchDataForKey(key, endpoint);
        }
    }
}

export async function watchKeyFolder() {
    // Implement the logic to watch the key folder
    // This is a placeholder implementation
    console.log('Watching key folder...');
    // You can use fs.watch or similar to watch the folder for changes
}