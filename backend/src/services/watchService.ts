import fs from 'fs';
import path from 'path';
import config from '@config/index';
import { regenerateKeys, getKeys } from './keyService';
import { setupCronJobs } from './cronService';
import { debounce } from '../helpers/debounce';

const debouncedRegenerateKeysAndSetupCronJobs = debounce(() => {
  regenerateKeys();
  setupCronJobs(getKeys());
}, 100);

export function watchKeyFolder() {
  fs.watch(config.keyFolder, (eventType, filename) => {
    if (filename && path.extname(filename) === '.json') {
      debouncedRegenerateKeysAndSetupCronJobs();
    }
  });
}