import React from 'react';
import { BalanceSumProps, BalanceData } from '@comalt/types';
import styles from "./BalanceSum.module.css";
import { calculateTotal, formatBalance } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BalanceSum: React.FC<BalanceSumProps> = ({ data }) => {
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const values: BalanceData[] = data ? Object.values(data) : [];

  const totalFree = calculateTotal(values, 'free');
  const totalStaked = calculateTotal(values, 'staked');
  const totalBalance = calculateTotal(values, 'total');

  return (
    <div className={styles.balanceSum}>
      <h3>Total Balances {isLoading ? '(fetching new data)' : ''}</h3>
      <p>Free: {formatBalance(totalFree)} $COMAI</p>
      <p>Staked: {formatBalance(totalStaked)} $COMAI</p>
      <p>Balance: {formatBalance(totalBalance)} $COMAI</p>
    </div>
  );
};

export default BalanceSum;