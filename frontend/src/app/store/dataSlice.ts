import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '../types/types'; // Import DataObject type

export interface DataState {
  value: DataObject | null; // Use DataObject type
  isLoading: boolean;
}

const initialState: DataState = {
  value: null,
  isLoading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<DataObject>) { // Use DataObject type
      state.value = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setLoading } = dataSlice.actions;

export default dataSlice.reducer;