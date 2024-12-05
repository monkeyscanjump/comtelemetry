interface Endpoint {
    name: string;
    endpoint: string;
    cronTime: string;
    method: string;
    headers: {
        Accept: string;
        'Content-Type': string;
    };
}
declare const config: {
    keyFolder: string;
    port: string | number;
    frontendPort: string | number;
    delayMs: number;
    fetchInterval: number;
    endpointList: Endpoint[];
};
export default config;
