"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenerateKeys = regenerateKeys;
exports.getKeys = getKeys;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("@config/index"));
let keys = [];
function regenerateKeys() {
    const files = fs_1.default.readdirSync(index_1.default.keyFolder).filter(file => path_1.default.extname(file) === '.json');
    keys = files.map(file => {
        try {
            const content = fs_1.default.readFileSync(path_1.default.join(index_1.default.keyFolder, file), 'utf-8');
            const parsedFile = content && JSON.parse(content);
            const parsedFileData = (parsedFile === null || parsedFile === void 0 ? void 0 : parsedFile.data) && JSON.parse(parsedFile.data);
            return {
                name: parsedFileData.path || '',
                address: parsedFileData.ss58_address || ''
            };
        }
        catch (error) {
            console.error(`Error reading file ${file}:`, error);
            return {
                name: '',
                address: ''
            };
        }
    }).filter(key => key.name && key.address); // Filter out invalid keys
}
function getKeys() {
    return keys;
}
