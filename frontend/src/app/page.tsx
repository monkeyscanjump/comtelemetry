"use client"; // This is a client component
import React from 'react';
import BalanceSum from './components/BalanceSum';
import KeyDisplay from './components/KeyDisplay';
import ControlBar from './components/ControlBar';
import useFetchData from './hooks/useFetchData';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import styles from "./page.module.css";
import config from '@comalt/config';

export default function Home() {
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const fetchInterval = isLoading ? 500 : config.fetchInterval; // Conditionally set fetchInterval

  const { fetchData, error } = useFetchData('http://localhost:3001/api/data', fetchInterval); // Remove loading
  const data = useSelector((state: RootState) => state.data.value);

  return (
    <div className={styles.page}>
      <div className={styles.pageItem}>
        <BalanceSum data={data} />
      </div>
      <div className={styles.pageItem}>
        <ControlBar fetchData={fetchData} />
      </div>
      <div className={styles.pageItem}>
        <KeyDisplay data={data} loading={isLoading} />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}