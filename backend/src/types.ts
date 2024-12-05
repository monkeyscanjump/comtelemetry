export interface Key {
  name: string;
  address: string;
}

export interface Endpoint {
  name: string;
  endpoint: string;
  method: string;
  headers?: Record<string, string>;
  cronTime: string;
}

export interface Data {
  [key: string]: {
    address?: string;
    [endpointName: string]: any;
  };
}

export interface InputObject {
  balance?: {
    data: {
      records: Array<{
        address: string;
        updatedAt: string;
        balanceFree: number;
        balanceStaked: number;
        balanceTotal: number;
      }>;
    };
  };
  stats?: {
    subnet_data: Array<any>;
    type: string;
    name: string;
    address: string;
    emission: number;
    incentive: number;
    dividends: number;
    regblock: number;
    last_update: number;
    stake: number;
    total_stakers: number;
    apy: number;
    stake_from: Array<[string, number]>;
    delegation_fee: number;
  };
}

export interface OutputObject {
  address?: string;
  balances?: {
    updatedAt: string;
    free: number;
    staked: number;
    total: number;
  };
  endpoint?: string;
  subnets?: Array<any>;
  type?: string;
  name?: string;
  emission?: number;
  incentive?: number;
  dividends?: number;
  regblock?: number;
  last_update?: number;
  stake?: number;
  total_stakers?: number;
  apy?: number;
  stake_from?: Array<[string, number]>;
  delegation_fee?: number;
}
