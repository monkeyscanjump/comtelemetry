import { Key } from '../types';
export declare function setupCronJobs(keys: Key[]): void;
export declare function triggerAllJobs(keys: Key[]): Promise<void>;
