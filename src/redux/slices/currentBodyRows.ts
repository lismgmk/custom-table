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
export interface IOneCheck {
  [key: string]: { value: boolean; name: string };
}
const initialState: {
  allRows: IRows[];
  allFilteredRows: IRows[];
  // filters: { [key: string]: boolean };
  filters: IOneCheck;
  mainCheckBox: boolean;
  // filters: IData;
  // sort: ISort;
  // activePage: number;
  // rowsPerPage: number;
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
      console.log(action.payload, 'redux');

      // if (Object.keys(action.payload).length === 0) {
      //   state.mainCheckBox = false;
      // }
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

    setDisFilter: (
      state,
      action: { payload: string },
      // action: { payload: { [key: string]: { value: boolean; name: string } } },
    ) => {
      const updatedFilters = { ...state.filters };
      delete updatedFilters[action.payload];
      // if (Object.keys(updatedFilters).length === 0) {
      //   state.mainCheckBox = false;
      // }
      if (
        Object.keys(updatedFilters).length ===
        Object.keys(state.allFilteredRows).length
      ) {
        state.mainCheckBox = true;
      }
      // if (
      //   Object.keys(updatedFilters).length ===
      //   Object.keys(state.allFilteredRows).length
      // ) {
      //   state.mainCheckBox = true;
      // }
      else {
        state.mainCheckBox = false;
      }
      state.filters = updatedFilters;
    },

    // checkMainCheckBox: (state, action: {payload: IOneCheck}) => {
    //   // if (Object.keys(state.allFilteredRows).length === 0) {
    //   //   state.mainCheckBox = false;
    //   // } else
    //   if (
    //     Object.keys(action.payload).length ===
    //     Object.keys(state.allFilteredRows).length
    //   ) {
    //     state.mainCheckBox = true;
    //   } else {
    //     state.mainCheckBox = false;
    //   }
    // },

    setMainCheckBox: (state, action: { payload: boolean }) => {
      const initialCheckBox = () => {
        const fullCheck: { [key: string]: { value: boolean; name: string } } =
          {};

        state.allFilteredRows.forEach((el) => {
          if (action.payload) {
            fullCheck[el.id] = { value: action.payload, name: el.name };
          }
          // if (mainCheck) {
          //   fullCheck[key] = { value: mainCheck, name: value.name };
          // }
        });

        return fullCheck;
      };
      console.log(initialCheckBox(), 'cccccccccccc');

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
