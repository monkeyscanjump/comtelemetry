export interface Balances {
    updatedAt: number;
    free: number;
    staked: number;
    total: number;
}
export interface Balance {
    address: string;
    balances: Balances;
}
export interface Subnet {
    subnet_id: number;
    uid: number;
    delegation_fee: number;
    apy: number;
    emission: number;
    incentive: number;
    dividends: number;
    regblock: number;
    name: string;
    subnet_name: string;
    tempo: number;
}
export interface Stats {
    subnets?: Subnet[];
    type?: string;
    name?: string;
    endpoint?: string;
    emission?: number;
    incentive?: number;
    dividends?: number;
    regblock?: number;
    last_update?: number;
    stake?: number;
    total_stakers?: number;
    apy?: number;
    stake_from?: [string, number][];
    delegation_fee?: number;
}
export interface DataItem {
    address: string;
    balance?: Balance;
    stats: Stats;
    [key: string]: any;
}
export interface DataObject {
    [key: string]: DataItem;
}
export interface Key {
    address: string;
    name: string;
}
export interface Endpoint {
    name: string;
    endpoint: string;
    method: string;
    headers: Record<string, string>;
}
export interface KeyDisplayProps {
    data: DataObject | null;
    loading: boolean;
}
export interface BalanceSumProps {
    data: DataObject | null;
}
export interface ControlBarProps {
    fetchData: () => Promise<void>;
}
export interface TotalBalance {
    free?: number;
    staked?: number;
    total?: number;
}
export interface BalanceData {
    balance?: {
        balances?: TotalBalance;
    };
}
export interface ResponseData {
    success: boolean;
    message: string;
    output?: string | number | boolean | object | null | void;
    error?: string;
}
