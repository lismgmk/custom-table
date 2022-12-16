import React from 'react';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../redux/slices/currentBodyRows';
import './Application.scss';
import { IColumn, IData, IResponse } from './dto/data.interface';
import Table from './Table';

// const data: IData[] = [
//   {
//     id: '1',
//     status: 'active',
//     sum: 5,
//     qty: 10,
//     volume: 1000,
//     name: 'box1',
//     delivery_date: new Date().toString(),
//     currency: 'USD',
//   },
//   {
//     id: '2',
//     status: 'active',
//     sum: 5,
//     qty: 10,
//     volume: 1000,
//     name: 'box2',
//     delivery_date: new Date().toString(),
//     currency: 'USD',
//   },
//   {
//     id: '3',
//     status: 'active',
//     sum: 5,
//     qty: 10,
//     volume: 1000,
//     name: 'box',
//     delivery_date: new Date().toString(),
//     currency: 'RUB',
//   },
// ];

const AppPage: React.FC = () => {
  const columns: IColumn[] = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'status', label: 'Status' },
    { accessor: 'sum', label: 'Sum' },
    { accessor: 'qty', label: 'Quantity' },
    { accessor: 'volume', label: 'Volume' },
    { accessor: 'delivery_date', label: 'Delivery date' },
    { accessor: 'currency', label: 'Currency' },
    // {
    //   accessor: 'is_manager',
    //   label: 'Manager',
    //   // format: (value: any) => (value ? '✔️' : '✖️'),
    // },
  ];

  const rows: IResponse[] = [
    {
      id: '1',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box1',
      delivery_date: new Date().getDate().toString(),
      currency: 'USD',
    },
    {
      id: '2',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box2',
      delivery_date: new Date().getDate().toString(),
      currency: 'USD',
    },
    {
      id: '3',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box',
      delivery_date: new Date().getDate().toString(),
      currency: 'RUB',
    },
  ];
  const dispatch = useAppDispatch();
  dispatch(currentBodyRowsSlice.actions.setInitialRows(rows));
  return (
    <div className='App'>
      <h1>Table</h1>
      <h2>Sorting, Filtering, Pagination</h2>

      <Table />
    </div>
  );
};

export default AppPage;
