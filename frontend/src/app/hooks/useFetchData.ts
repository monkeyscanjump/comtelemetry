import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '../store/dataSlice';
import axios from 'axios';
import { DataObject } from '@comalt/types';

const useFetchData = (url: string, interval: number) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataObject>(url);
      dispatch(setData(response.data));
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [url, dispatch]);

  useEffect(() => {
    fetchData(); // Initial fetch

    const id = setInterval(fetchData, interval);

    return () => clearInterval(id);
  }, [fetchData, interval]);

  return { fetchData, loading, error };
};

export default useFetchData;