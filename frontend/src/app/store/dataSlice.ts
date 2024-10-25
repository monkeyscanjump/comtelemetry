import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '@types/types';

export interface DataState {
  value: DataObject | null;
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
    setData(state, action: PayloadAction<DataObject>) {
      state.value = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setLoading } = dataSlice.actions;

export default dataSlice.reducer;