import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../redux/slices/currentBodyRows';
import { RootState } from '../redux/store';
import { IColumn, IData } from './dto/data.interface';
import { filterRows, paginateRows, sortRows } from './helper';
import Pagination from './Pagination';

const Table = () => {
  const dispatch = useAppDispatch();
  const redux = useSelector((state: RootState) => state.currentBodyRows);
  // console.log(rowsRedux.allFilteredRows, ';;;;;');

  // const { columns, rows } = props;
  // const [activePage, setActivePage] = useState(1);
  // const [filters, setFilters] = useState({});
  // const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  // const rowsPerPage = 3;

  // const filteredRows = useMemo(
  //   () => filterRows(rows, filters),
  //   [rows, filters],
  // );
  // const sortedRows = useMemo(
  //   () => sortRows(filteredRows, sort),
  //   [filteredRows, sort],
  // );
  // const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  // const count = filteredRows.length;
  // const totalPages = Math.ceil(count / rowsPerPage);

  // const handleSearch = (value: string, accessor: string) => {
  //   setActivePage(1);

  //   if (value) {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       [accessor]: value,
  //     }));
  //   } else {
  //     setFilters((prevFilters) => {
  //       const updatedFilters = { ...prevFilters };
  //       // delete updatedFilters[accessor];

  //       return updatedFilters;
  //     });
  //   }
  // };

  // const handleSort = (accessor: any) => {
  //   setActivePage(1);
  //   setSort((prevSort) => ({
  //     order:
  //       prevSort.order === 'asc' && prevSort.orderBy === accessor
  //         ? 'desc'
  //         : 'asc',
  //     orderBy: accessor,
  //   }));
  // };

  // const clearAll = () => {
  //   setSort({ order: 'asc', orderBy: 'id' });
  //   setActivePage(1);
  //   setFilters({});
  // };

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.entries(redux.filters).map(([key, value], index) => {
              return (
                <th id={key} key={index}>
                  <span>{value.label}</span>
                  <th>
                    <input
                      type={value.type}
                      placeholder={`Search ${value.label}`}
                      value={value.searchValue}
                      checked={value.checked}
                      onChange={(event) =>
                        dispatch(
                          currentBodyRowsSlice.actions.filterRows({
                            [key]: event.target.value,
                          }),
                        )
                      }
                    />
                  </th>

                  {/* <button onClick={() => handleSort(column.accessor)}>
                    {sortIcon()}
                  </button> */}
                </th>
              );
            })}
            {/* {Object.entries(redux.filters).map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️';
                  }
                  return '⬇️';
                } else {
                  return '️↕️';
                }
              };
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    {sortIcon()}
                  </button>
                </th>
              );
            })} */}
          </tr>
          {/* <tr>
            {columns.map((column, index: number) => {
              // {columns.map((column, index: number) => {
              return (
                <th key={index}>
                  <input
                    key={`${column.accessor}-search`}
                    type='search'
                    placeholder={`Search ${column.label}`}
                    // value={filters[column.accessor]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
          </tr> */}
        </thead>
        <tbody>
          {Object.entries(redux.allFilteredRows).map(([key, value], index) => {
            return (
              <tr id={key} key={key}>
                {Object.values(value).map((el, index) => {
                  return <td key={index + 100}>{el}</td>;
                })}
              </tr>
            );
          })}
          {/* 
          {rowsRedux.allFilteredRows.map((row, index1: number) => {
            return (
              <tr key={index1}>
                {Object.values(row).map((el, index) => {
                  return <td key={index + 100}>{el}</td>;
                })}
              </tr>
            );
          })} */}
        </tbody>
      </table>

      {/* {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )} */}

      {/* <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div> */}
    </>
  );
};

export default Table;
