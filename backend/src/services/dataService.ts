import axios from 'axios';
import { Key, Endpoint, Data } from '../types';
import { parseAndFilterEndpoints } from '../helpers/parseAndFilterEndpoints';
import config from '@comalt/config';
import { debounce } from '../../../shared/utils/debounce';

let data: Data = {};

// Create an Axios instance with an empty config object
const axiosInstance = axios.create({});

/**
 * Custom type for Axios error.
 */
interface AxiosError extends Error {
  config: any;
  code?: string;
  request?: any;
  response?: any;
  isAxiosError: boolean;
  toJSON: () => object;
}

/**
 * Custom type guard function to check if an error is an AxiosError.
 * @param error - The error to check.
 * @returns {boolean} - True if the error is an AxiosError, false otherwise.
 */
function isAxiosError(error: any): error is AxiosError {
  return error && error.isAxiosError === true;
}

/**
 * Helper function to check if an error is retryable.
 * @param error - The error to check.
 * @returns {boolean} - True if the error is retryable, false otherwise.
 */
function isRetryableError(error: any): error is AxiosError {
  return (
    isAxiosError(error) &&
    error.response &&
    error.response.status === 500 &&
    !error.config.__isRetryRequest
  );
}

// Set up Axios interceptor for retry logic
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (isRetryableError(error)) {
      const config = error.config;

      // Add a retry count to prevent infinite loops
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < 2) { // Retry maximum 2 times
        config.__retryCount += 1;
        console.log(`Retrying request for URL: ${config.url} (Attempt ${config.__retryCount})`);
        return axiosInstance.request(config);
      }
    }
    return Promise.reject(error);
  }
);

// Debounce wrapper function with headers as an optional parameter
const debouncedFetch = debounce(
  async (url: string, method: string, headers?: Record<string, string>) => {
    return axiosInstance({ method, url, headers });
  },
  config.delayMs
);

/**
 * Fetches data for a given key and endpoint.
 * @param key - The key for which to fetch data.
 * @param endpoint - The endpoint from which to fetch data.
 */
export async function fetchDataForKey(key: Key, endpoint: Endpoint): Promise<void> {
  try {
    const endpointName = endpoint.name;
    const url = endpoint.endpoint.replace('${keys.address}', key.address);

    const response = await debouncedFetch(url, endpoint.method, endpoint.headers);

    // Initialize the data object for the key if not already done
    data[key.name] = data[key.name] || { address: key.address };

    // Parse the response data
    const parsedData = parseAndFilterEndpoints({
      [endpoint.name]: response.data,
    });

    // Save the parsed data to the data object
    data[key.name][endpointName] = parsedData;
  } catch (error) {
    console.error(`Error fetching data for ${key.name} from ${endpoint.endpoint}:`, error);
  }
}

/**
 * Retrieves the collected data.
 * @returns {Data} - The collected data.
 */
export function getData(): Data {
  return data;
}