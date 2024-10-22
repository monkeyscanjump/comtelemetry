"use client"; // This is a client component
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styles from './ControlBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLoading } from '../store/dataSlice';

interface ControlBarProps {
  fetchData: () => Promise<void>;
}

// Define the AxiosError type
interface AxiosError<T = any> extends Error {
  config?: any;
  code?: string;
  request?: any;
  response?: {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
  };
  isAxiosError: boolean;
  toJSON: () => object;
}

// Type guard function to check if the error is an Axios error
const isAxiosError = (error: unknown): error is AxiosError<{ message: string }> => {
  return (error as AxiosError).isAxiosError !== undefined;
};

const ControlBar: React.FC<ControlBarProps> = ({ fetchData }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const [triggerError, setTriggerError] = useState<string | null>(null);

  const handleTriggerJobs = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      await axios.post('http://localhost:3001/api/trigger-jobs');
      await fetchData();
      setTriggerError(null); // Clear any previous error on success
    } catch (err) {
      console.error('Error triggering jobs:', err);
      if (isAxiosError(err)) {
        setTriggerError(err.response?.data?.message || 'Error triggering jobs');
      } else if (err instanceof Error) {
        setTriggerError(err.message);
      } else {
        setTriggerError('Error triggering jobs');
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [fetchData, dispatch]);

  return (
    <div>
      <div className={styles.controlBar}>
        <button onClick={handleTriggerJobs} disabled={isLoading}>
          {isLoading ? 'Fetching data' : 'Trigger data gathering'}
        </button>
        <button disabled>
          Flush staked balances
        </button>
        <button disabled>
          Flush free balance to logged in wallet
        </button>
      </div>
      {triggerError && <p style={{ color: 'red' }}>{triggerError}</p>}
    </div>
  );
};

export default ControlBar;