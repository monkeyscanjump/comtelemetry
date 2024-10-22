import cron from 'node-cron';
import config from '@config/index';
import { fetchDataForKey } from './dataService';
import { Key } from '../types';

export function setupCronJobs(keys: Key[]) {
    keys.forEach(key => {
        config.endpointList.forEach(endpoint => {
            cron.schedule(endpoint.cronTime, () => fetchDataForKey(key, endpoint));
        });
    });
}

export async function triggerAllJobs(keys: Key[]) {
    for (const key of keys) {
        for (const endpoint of config.endpointList) {
            await fetchDataForKey(key, endpoint);
        }
    }
}