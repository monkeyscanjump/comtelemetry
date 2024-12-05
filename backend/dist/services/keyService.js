"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenerateKeys = regenerateKeys;
exports.getKeys = getKeys;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("@comalt/config"));
let keys = [];
/**
 * Regenerates the keys by reading the key folder and parsing the JSON files.
 * Updates the global `keys` array with valid keys.
 */
function regenerateKeys() {
    try {
        // Check if the key folder exists
        if (!fs_1.default.existsSync(config_1.default.keyFolder)) {
            console.error(`Key folder does not exist: ${config_1.default.keyFolder}`);
            keys = [];
            return;
        }
        const files = fs_1.default.readdirSync(config_1.default.keyFolder);
        keys = files
            .filter(file => path_1.default.extname(file) === '.json')
            .flatMap(file => {
            const filePath = path_1.default.join(config_1.default.keyFolder, file);
            try {
                const content = fs_1.default.readFileSync(filePath, 'utf-8');
                const parsedFile = JSON.parse(content);
                const parsedFileData = (parsedFile === null || parsedFile === void 0 ? void 0 : parsedFile.data) && JSON.parse(parsedFile.data);
                const key = {
                    name: (parsedFileData === null || parsedFileData === void 0 ? void 0 : parsedFileData.path) || '',
                    address: (parsedFileData === null || parsedFileData === void 0 ? void 0 : parsedFileData.ss58_address) || ''
                };
                // Only return valid keys
                if (key.name && key.address) {
                    return [key];
                }
                else {
                    console.error(`Invalid key in file ${file}:`, key);
                    return [];
                }
            }
            catch (error) {
                console.error(`Error parsing file ${file}:`, error);
                return [];
            }
        });
    }
    catch (error) {
        console.error('Error reading key folder:', error);
        keys = [];
    }
}
/**
 * Retrieves the current list of keys.
 * @returns {Key[]} The list of keys.
 */
function getKeys() {
    return keys;
}
