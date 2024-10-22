import { InputObject, OutputObject } from '../types';
  
  export function parseAndFilterEndpoints(input: InputObject): OutputObject {
    const output: OutputObject = {};

    if (input.balance) {
      const record = input.balance.data.records[0];
      if (record) {
        output.balances = {
          updatedAt: record.updatedAt || '',
          free: record.balanceFree || 0,
          staked: record.balanceStaked || 0,
          total: record.balanceTotal || 0,
        }
      }
    }
  
    if (input.stats) {
      const record = input.stats;
      output.subnets = record.subnet_data || {};
      output.type = record.type || '';
      output.name = record.name || '';
      output.endpoint = record.address || '';
      output.emission = record.emission || 0;
      output.incentive = record.incentive || 0;
      output.dividends = record.dividends || 0;
      output.regblock = record.regblock || 0;
      output.last_update = record.last_update || 0;
      output.stake = record.stake || 0;
      output.total_stakers = record.total_stakers || 0;
      output.apy = record.apy || 0;
      output.stake_from = record.stake_from || [];
      output.delegation_fee = record.delegation_fee || 0;
    }
  
    return output;
  }