import { createSlice } from '@reduxjs/toolkit';
import { isDate } from 'date-fns';
import {
  EnNameColumns,
  IResponse,
  IRows,
} from '../../global-dto/data.interface';
import { orderKey } from '../../helpers/orderHelper';
import { isNumber, isStrings, toDateUI, toLower } from '../../helpers/utils';

export interface IOneCheck {
  [key: string]: { value: boolean; name: string };
}
const initialState: {
  allRows: IRows[];
  allFilteredRows: IRows[];
  filters: IOneCheck;
  mainCheckBox: boolean;
} = {
  allRows: [],
  allFilteredRows: [],
  filters: {},
  mainCheckBox: false,
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
      if (
        Object.keys(action.payload).length ===
        Object.keys(state.allFilteredRows).length
      ) {
        state.mainCheckBox = true;
      } else {
        state.mainCheckBox = false;
      }
      state.filters = action.payload;
    },

    setDisFilter: (state, action: { payload: string }) => {
      const updatedFilters = { ...state.filters };
      delete updatedFilters[action.payload];

      if (
        Object.keys(updatedFilters).length ===
        Object.keys(state.allFilteredRows).length
      ) {
        state.mainCheckBox = true;
      } else {
        state.mainCheckBox = false;
      }
      state.filters = updatedFilters;
    },

    setMainCheckBox: (state, action: { payload: boolean }) => {
      const initialCheckBox = () => {
        const fullCheck: { [key: string]: { value: boolean; name: string } } =
          {};

        state.allFilteredRows.forEach((el) => {
          if (action.payload) {
            fullCheck[el.id] = { value: action.payload, name: el.name };
          }
        });

        return fullCheck;
      };

      state.filters = initialCheckBox();
      state.mainCheckBox = action.payload;
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

            // if (isDate(new Date(value))) {
            if (isDate(value)) {
              return toDateUI(value).includes(searchValue);
            }
            if (isStrings(value)) {
              return toLower(value).includes(toLower(searchValue));
            }

            if (isNumber(value)) {
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
