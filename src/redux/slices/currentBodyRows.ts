import { createSlice } from '@reduxjs/toolkit';
import {
  EnNameColumns,
  IData,
  IFilters,
  // IFilters,
  IResponse,
  IRows,
  ISort,
} from '../../components/dto/data.interface';
import {
  isBoolean,
  isEmpty,
  isNumber,
  isStrings,
  toLower,
} from '../../components/helper';
import { orderKey } from '../../components/helpers/orderHelper';

const initialState: {
  allRows: IRows[];
  allFilteredRows: IRows[];
  // filters: { [key: string]: boolean };
  filters: { [key: string]: { value: boolean; name: string } };
  // filters: IData;
  // sort: ISort;
  // activePage: number;
  // rowsPerPage: number;
} = {
  allRows: [],
  allFilteredRows: [],
  filters: {},
};

export const currentBodyRowsSlice = createSlice({
  name: 'currentBodyRows',
  initialState,
  reducers: {
    setInitialRows: (state, action: { payload: IResponse[] }) => {
      action.payload.sort((a, b) => {
        return (
          Number(new Date(a.delivery_date)) - Number(new Date(b.delivery_date))
        );
      });
      const initialState: IRows[] = action.payload.map((el) => {
        const all = `${el.qty * el.sum} ${el.currency}`;
        return {
          ...orderKey(el),
          all,
        };
      });
      state.allRows = initialState;
      state.allFilteredRows = initialState;
    },

    setFilter: (
      state,
      action: { payload: { [key: string]: { value: boolean; name: string } } },
    ) => {
      state.filters = action.payload;
    },

    filterRows: (
      state,
      action: {
        payload: {
          [key in EnNameColumns]?: string;
        };
      },
    ) => {
      const payloadArr = Object.keys(action.payload);

      if (Object.keys(action.payload).length === 0) {
        state.allFilteredRows = state.allRows;
      } else {
        state.allFilteredRows = [...state.allRows].filter((row) => {
          return payloadArr.every((item: keyof Omit<IRows, 'id'>) => {
            const value = row[item];
            const searchValue = action.payload[item];

            if (isStrings(value)) {
              return toLower(value).includes(toLower(searchValue));
            }
            if (isNumber(value)) {
              // return value.toString().includes(searchValue);
              // if (value.toString().includes(searchValue)) {
              //   filteredState[rowKey] = rowValue;
              // }
              return value == searchValue;
            } else {
              return false;
            }
          });
        });
      }
    },
  },
});
