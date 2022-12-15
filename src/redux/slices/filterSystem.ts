import { createSlice } from '@reduxjs/toolkit';

export type SortColumnType = 'accountName' | 'daysCutOff' | 'balance' | 'avgCost' | 'updated' | '';
export type SortColumnValueType = 'up' | 'down' | 'start' | '';

export interface IFilterSystem {
  name: string;
  state: boolean;
  label: string;
}

export interface ISort {
  nameRow: SortColumnType;
  sortValue: SortColumnValueType;
  checkState: boolean;
}

const initialState: { systems: IFilterSystem[]; statuses: IFilterSystem[]; search: string; sort: ISort[] } = {
  systems: [
    {
      name: 'unknown',
      state: false,
      label: 'unknown',
    },
  ],
  statuses: [
    {
      name: 'unknown',
      state: false,
      label: 'unknown',
    },
  ],
  search: '',
  sort: [
    { nameRow: 'accountName', sortValue: 'start', checkState: false },
    { nameRow: 'daysCutOff', sortValue: 'start', checkState: false },
    { nameRow: 'balance', sortValue: 'start', checkState: false },
    { nameRow: 'avgCost', sortValue: 'start', checkState: false },
    { nameRow: 'updated', sortValue: 'start', checkState: false },
  ],
};

export const filterSystemSlice = createSlice({
  name: 'filterSystem',
  initialState,
  reducers: {
    getFilterSystems: (state, action) => {
      state.systems = action.payload;
    },
    getFilterStatuses: (state, action) => {
      state.statuses = action.payload;
    },
    setFilterSearch: (state, action: { payload: string }) => {
      state.search = action.payload;
    },
    setAllDefault: (state) => {
      state.search = initialState.search;
      state.sort = initialState.sort;
      state.systems = initialState.systems;
      state.statuses = initialState.statuses;
    },
    getFilterSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilterSort: (state, action: { payload: { nameRow: SortColumnType; sortValue: SortColumnValueType } }) => {
      state.sort = state.sort.map((el) => {
        if (el.nameRow === action.payload.nameRow) {
          return {
            nameRow: action.payload.nameRow,
            checkState: true,
            sortValue: action.payload.sortValue,
          };
        } else {
          return { ...el, checkState: false, sortValue: 'start' };
        }
      });
    },
  },
});
