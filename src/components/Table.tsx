import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { IColumn, IData } from './dto/data.interface';
import { filterRows, sortRows, paginateRows } from './helper';
import Pagination from './Pagination';

const Table = (props: { columns: IColumn[]; rows: IData[] }) => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.currentBodyRows);

  const { columns, rows } = props;
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const rowsPerPage = 3;

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters],
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort],
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value: string, accessor: string) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        // delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor: any) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === 'asc' && prevSort.orderBy === accessor
          ? 'desc'
          : 'asc',
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' });
    setActivePage(1);
    setFilters({});
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span>Check</span>
              <input
                type='checkbox'
                name='check'
                // checked={this.state.check}
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </th>

            {columns.map((column) => {
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
            })}
          </tr>
          <tr>
            {columns.map((column, index: number) => {
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
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map((column: any) => {
                  if (column.format) {
                    return (
                      <td key={column.accessor}>
                        {column.format(row[column.accessor])}
                      </td>
                    );
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </>
  );
};

export default Table;
