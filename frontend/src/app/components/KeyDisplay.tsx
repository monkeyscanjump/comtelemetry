import React from 'react';
import { formatBalance, convertSeconds } from '../utils/helpers';
import { KeyDisplayProps } from '../types/types';
import styles from './KeyDisplay.module.css';

const KeyDisplay: React.FC<KeyDisplayProps> = ({ data }) => {
  return (
    <div className={styles.communeKeysDisplay}>
      <h3>{data && Object.entries(data).length ? 'Your Commune Keys' : 'No data available yet. Trigger jobs to populate backend data.'}</h3>
      {data && Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className={`${styles.communeKey} ${value.stats?.subnets ? '' : styles.communeKeyInactive}`}
        >
          <h3 className={styles.communeKeyName}>{key}</h3>
          <p><b>Address:</b> {value.address}</p>
          <div className={styles.communeKeyDetails}>
            {value.stats?.subnets ? (
              <ul>
                <h5>Subnets:</h5>
                {value.stats.subnets.map((subnet, index) => (
                  <li key={index}>
                    {subnet.name} (SN: {subnet.subnet_id}) UID: {subnet.uid} | Tempo: {subnet.tempo} ({convertSeconds(8 * subnet.tempo)}) | Emission {formatBalance(subnet.emission)} | Incentive {subnet.incentive} | Dividends {subnet.dividends}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No modules registered</p>
            )}
            {value.balance?.balances ? (
              <div>
                <h5>Balance</h5>
                <p>
                  Free {formatBalance(value.balance.balances.free)} | 
                  Staked {formatBalance(value.balance.balances.staked)} | 
                  Total {formatBalance(value.balance.balances.total)}
                </p>
              </div>
            ) : (
              <p>No balance data available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyDisplay;