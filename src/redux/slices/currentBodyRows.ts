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
  filters: IFilters;
  // filters: IData;
  sort: ISort;
  activePage: number;
  rowsPerPage: number;
} = {
  allRows: {},
  allFilteredRows: {},
  filters: {
    checked: {
      label: 'Check',
      type: 'checkbox',
      checked: false,
    },
    name: {
      label: 'Name',
      searchValue: '',
      type: 'search',
    },
    sum: { label: 'Sum', searchValue: '', type: 'number' },
    qty: { label: 'Quontity', searchValue: '', type: 'number' },
    volume: {
      label: 'Volume',
      searchValue: '',
      type: 'number',
    },
    status: {
      label: 'status',
      searchValue: '',
      type: 'search',
    },
    delivery_date: {
      label: 'Date',
      searchValue: '',
      type: 'search',
    },
    currency: {
      label: 'currency',
      searchValue: '',
      type: 'search',
    },
    all: {
      label: 'all',
      searchValue: '',
      type: 'search',
    },
  },
  sort: { order: 'asc', orderBy: 'delivery_date' },

  activePage: 1,
  rowsPerPage: 0,
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
          checked: false,
          all,
        };
      });
      state.allRows = initialState;
      state.allFilteredRows = initialState;
    },

    switchAllChecked: (state, action: { payload: { switch: boolean } }) => {
      state.filters.checked.checked = action.payload.switch;
      Object.keys(state.allFilteredRows).forEach((el) => {
        state.allFilteredRows[el] = {
          ...state.allFilteredRows[el],
          checked: false,
        };
      });
    },

    switchOneChecked: (
      state,
      action: { payload: { switch: boolean; id: string } },
    ) => {
      state.filters.checked.checked = false;
      state.allFilteredRows[action.payload.id].checked = action.payload.switch;
    },

    filterRows: (
      state,
      action: {
        payload: {
          [key in EnNameColumns]?: string;
          // status?: boolean;
          // sum?: number;
          // qty?: number;
          // volume?: number;
          // name?: string;
          // delivery_date?: string;
          // currency?: string;
        };
      },
    ) => {
      const payloadArr = Object.keys(action.payload);
      if (isEmpty(action.payload)) {
        state.allFilteredRows;
      } else {
        payloadArr.forEach((el: keyof Omit<IRows, 'id'>) => {
          state.filters[el].searchValue = action.payload[el];
          // state.filters[el].serchValue = action.payload[el];
        });
        const filteredState: IData = {};
        Object.entries(state.allFilteredRows).forEach(([rowKey, rowValue]) => {
          payloadArr.forEach((item: keyof Omit<IRows, 'id'>) => {
            const value = rowValue[item as keyof IRows];
            const searchValue = action.payload[item];
            // if (isStrings(value)) {
            //   return toLower(value).includes(toLower(searchValue));
            // }
            if (toLower(value).includes(toLower(searchValue)) !== -1) {
              filteredState[rowKey] = rowValue;
            }

            // if (isBoolean(value)) {
            //   return (
            //     (searchValue === 'true' && value) ||
            //     (searchValue === 'false' && !value)
            //   );
            // }

            // if (isNumber(value)) {
            //   return value == searchValue;
            // }
          });
        });
        state.allFilteredRows = filteredState;
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
      }
    },
  },
});
