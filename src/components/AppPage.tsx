import React from 'react';
import './Application.scss';
import { IColumn, IData } from './dto/data.interface';
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

  const rows: IData[] = [
    {
      id: '1',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box1',
      delivery_date: new Date().getDate().toString(),
      currency: 'USD',
      checked: false,
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
      checked: false,
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
      checked: false,
    },
  ];

  return (
    <div className='App'>
      <h1>Table</h1>
      <h2>Sorting, Filtering, Pagination</h2>

      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default AppPage;
