"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
function debounce(func, wait) {
    let timeout;
    return ((...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args).then(resolve).catch(reject);
            }, wait);
        });
    });
}
