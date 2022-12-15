import { createSlice } from '@reduxjs/toolkit';
import {
  IData,
  // IFilters,
  INameColumns,
  ISort,
} from '../../components/dto/data.interface';
import {
  isBoolean,
  isEmpty,
  isNumber,
  isStrings,
  toLower,
} from '../../components/helper';

const initialState: {
  allRows: IData[];
  allFilteredRows: IData[];
  // filters: IFilters;
  filters: IData;
  sort: ISort;
  activePage: number;
  rowsPerPage: number;
} = {
  allRows: [],
  allFilteredRows: [],
  filters: {
    id: '01',
    delivery_date: '',
    name: '',
    status: 'active',
    sum: 0,
    qty: 0,
    volume: 0,
    currency: 'usd',
    checked: false,
  },
  sort: { order: 'asc', orderBy: 'delivery_date' },
  activePage: 1,
  rowsPerPage: 0,
};

export const currentBodyRowsSlice = createSlice({
  name: 'currentBodyRows',
  initialState,
  reducers: {
    setInitialRows: (state, action: { payload: IData[] }) => {
      state.allRows = action.payload;
      state.allFilteredRows = action.payload;
    },

    switchAllChecked: (state, action: { payload: { switch: boolean } }) => {
      state.allFilteredRows = state.allFilteredRows.map((el) => ({
        ...el,
        checked: action.payload.switch,
      }));
    },

    switchOneChecked: (
      state,
      action: { payload: { switch: boolean; id: string } },
    ) => {
      state.allFilteredRows = state.allFilteredRows.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, checked: action.payload.switch };
        } else {
          return el;
        }
      });
    },

    filterRows: (
      state,
      action: {
        payload: {
          id?: string;
          status?: boolean;
          sum?: number;
          qty?: number;
          volume?: number;
          name?: string;
          delivery_date?: string;
          currency?: string;
        };
      },
    ) => {
      if (isEmpty(action.payload)) {
        state.allRows;
      } else {
        state.allFilteredRows.filter((row) => {
          return Object.keys(action.payload).every((accessor: INameColumns) => {
            const value = row[accessor];
            const searchValue = action.payload[accessor];

            if (isStrings(value)) {
              return toLower(value).includes(toLower(searchValue));
            }

            if (isBoolean(value)) {
              return (
                (searchValue === 'true' && value) ||
                (searchValue === 'false' && !value)
              );
            }

            if (isNumber(value)) {
              return value == searchValue;
            }
            return false;
          });
        });
      }
    },
  },
});
