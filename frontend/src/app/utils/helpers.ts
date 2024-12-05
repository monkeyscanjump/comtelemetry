import { BalanceData, TotalBalance } from '@comalt/types';
import { formatAmount } from '@did-network/dapp-sdk';

export const calculateTotal = (data: BalanceData[], property: keyof TotalBalance): number => {
  return data.reduce((sum, item) => {
    const value = item?.balance?.balances?.[property] ?? 0;
    return sum + Number(value);
  }, 0);
};

export const formatBalance = (amount: number): string => {
  return formatAmount(amount, 9, 2);
};

export const convertSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ' ' + minutes + 'm' : ''}`;
  } else {
    return `${minutes}m`;
  }
};