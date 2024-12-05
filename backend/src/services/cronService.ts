import cron from 'node-cron';
import config from '@comalt/config';
import { fetchDataForKey } from './dataService';
import { Key, Endpoint } from '../types';

const cronJobs = new Map<string, cron.ScheduledTask[]>();

/**
 * Stops and removes existing cron jobs for a given key name.
 * @param keyName - The name of the key whose cron jobs should be stopped.
 */
function stopExistingJobs(keyName: string) {
  const existingJobs = cronJobs.get(keyName);
  if (existingJobs) {
    console.log('Stopping existing jobs for key:', keyName);
    existingJobs.forEach(job => job.stop());
    cronJobs.delete(keyName);
  }
}

/**
 * Schedules new cron jobs for a given key.
 * @param key - The key for which to schedule cron jobs.
 */
function scheduleJobsForKey(key: Key) {
  const jobs: cron.ScheduledTask[] = config.endpointList.map(endpoint => {
    console.log('Scheduling job for key:', key.name);
    return cron.schedule(endpoint.cronTime, () => fetchDataForKey(key, endpoint));
  });
  cronJobs.set(key.name, jobs);
}

/**
 * Sets up cron jobs for a list of keys. Stops existing jobs and schedules new ones.
 * @param keys - The list of keys for which to set up cron jobs.
 */
export function setupCronJobs(keys: Key[]) {
  keys.forEach(key => {
    stopExistingJobs(key.name);
    scheduleJobsForKey(key);
  });
}

/**
 * Triggers all jobs for a list of keys immediately.
 * @param keys - The list of keys for which to trigger jobs.
 */
export async function triggerAllJobs(keys: Key[]) {
  for (const key of keys) {
    for (const endpoint of config.endpointList) {
      console.log('Triggering job for key:', key.name);
      await fetchDataForKey(key, endpoint);
    }
  }
}
