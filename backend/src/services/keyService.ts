import fs from 'fs';
import path from 'path';
import config from '@config/index';
import { Key } from '../types';

let keys: Key[] = [];

export function regenerateKeys() {
  const files = fs.readdirSync(config.keyFolder).filter(file => path.extname(file) === '.json');
  
  keys = files.map(file => {
    try {
      const content = fs.readFileSync(path.join(config.keyFolder, file), 'utf-8');
      const parsedFile = content && JSON.parse(content);
      const parsedFileData = parsedFile?.data && JSON.parse(parsedFile.data);
      return {
        name: parsedFileData.path || '',
        address: parsedFileData.ss58_address || ''
      };
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
      return {
        name: '',
        address: ''
      };
    }
  }).filter(key => key.name && key.address); // Filter out invalid keys
}

export function getKeys() {
  return keys;
}