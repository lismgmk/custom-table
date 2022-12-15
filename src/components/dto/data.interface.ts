export interface IColumn {
  accessor: string;
  label: string;
}

export interface IData {
  id: string;
  status: 'active' | 'archive';
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
  checked: boolean;
}

export type INameColumns =
  | 'id'
  | 'status'
  | 'sum'
  | 'qty'
  | 'volume'
  | 'name'
  | 'delivery_date'
  | 'currency';

// export type IFilters = {
//   [key in keyof Omit<IData, 'id' | 'cheked'>]: string;
// };

export interface ISort {
  order: 'asc' | 'desc';
  orderBy: keyof Omit<IData, 'id'>;
}
