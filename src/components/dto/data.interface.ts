export interface IColumn {
  accessor: string;
  label: string;
}

export interface IResponse {
  id: string;
  status: 'active' | 'archive';
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
}
export interface IRows {
  id?: string;
  status?: 'active' | 'archive';
  sum?: number;
  qty?: number;
  volume?: number;
  name?: string;
  delivery_date?: string;
  currency?: string;
  checked?: boolean;
  all?: string;
}

export interface IData {
  [key: string]: IRows;
}

export enum EnNameColumns {
  checked = 'checked',
  name = 'name',
  sum = 'sum',
  qty = 'qty',
  volume = 'volume',
  status = 'status',
  delivery_date = 'delivery_date',
  currency = 'currency',
  all = 'all',
}
export type IFilters = {
  [key in keyof Omit<IRows, 'id'>]: {
    label: string;
    searchValue?: string;
    type: string;
    checked?: boolean;
  };
};

export interface ISort {
  order: 'asc' | 'desc';
  orderBy: keyof Omit<IData, 'id'>;
}
