import { Key } from '../types';
/**
 * Sets up cron jobs for a list of keys. Stops existing jobs and schedules new ones.
 * @param keys - The list of keys for which to set up cron jobs.
 */
export declare function setupCronJobs(keys: Key[]): void;
/**
 * Triggers all jobs for a list of keys immediately.
 * @param keys - The list of keys for which to trigger jobs.
 */
export declare function triggerAllJobs(keys: Key[]): Promise<void>;
