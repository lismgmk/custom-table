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
  allRows: IData;
  allFilteredRows: IData;
  filters: { [key: string]: boolean };
  // filters: IData;
  // sort: ISort;
  // activePage: number;
  // rowsPerPage: number;
} = {
  allRows: {},
  allFilteredRows: {},
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
      const initialState: IData = {};
      action.payload.forEach((el) => {
        const all = `${el.qty * el.sum} ${el.currency}`;
        initialState[el.id] = {
          ...orderKey(el),
          all,
        };
      });
      state.allRows = initialState;
      state.allFilteredRows = initialState;
    },

    setFilter: (state, action: { payload: { [key: string]: boolean } }) => {
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
        let filteredState: IData = {};
        Object.entries(state.allRows).forEach(([rowKey, rowValue]) => {
          payloadArr.forEach((item: keyof Omit<IRows, 'id'>) => {
            const value = rowValue[item as keyof IRows];
            const searchValue = action.payload[item];

            if (isStrings(value)) {
              if (toLower(value).includes(toLower(searchValue))) {
                filteredState[rowKey] = rowValue;
              }
            }
            if (isNumber(value)) {
              if (value.toString().includes(searchValue)) {
                filteredState[rowKey] = rowValue;
              } else {
                filteredState = {};
              }
            }
          });
        });
        console.log(filteredState);

        state.allFilteredRows = filteredState;
      }
      // payloadArr.forEach((el: keyof Omit<IRows, 'id'>) => {
      //   state.filters[el].searchValue = action.payload[el];
      //   // state.filters[el].serchValue = action.payload[el];
      // });

      // state.allFilteredRows.filter((row) => {
      //   return Object.keys(action.payload).every((accessor: INameColumns) => {
      //     const value = row[accessor];
      //     const searchValue = action.payload[accessor];

      //     if (isStrings(value)) {
      //       return toLower(value).includes(toLower(searchValue));
      //     }

      //     if (isBoolean(value)) {
      //       return (
      //         (searchValue === 'true' && value) ||
      //         (searchValue === 'false' && !value)
      //       );
      //     }

      //     if (isNumber(value)) {
      //       return value == searchValue;
      //     }
      //     return false;
      //   });
      // });
      // }
    },
  },
});
