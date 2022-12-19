import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../../redux/slices/currentBodyRows';
import { RootState } from '../../redux/store';
import { IData, IRows } from '../../global-dto/data.interface';
import { toDateUI } from '../../helpers/utils';
import { columns } from './const-data/column';
import { v4 as uuid } from 'uuid';
import Select from 'react-select';

const Table = () => {
  const [allRows, setAllRows] = useState<IData>({});

  const dispatch = useAppDispatch();
  const reduxRows = useSelector(
    (state: RootState) => state.currentBodyRows.allFilteredRows,
  );
  const reduxMainCheckBox = useSelector(
    (state: RootState) => state.currentBodyRows.mainCheckBox,
  );
  const reduxFilter = useSelector(
    (state: RootState) => state.currentBodyRows.filters,
  );
  const [filters, setFilters] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    dispatch(currentBodyRowsSlice.actions.filterRows(filters));
  }, [filters]);

  const handlerMainCheck = (checked: boolean) => {
    dispatch(currentBodyRowsSlice.actions.setMainCheckBox(checked));
  };

  const handlerOneCheck = (checked: boolean, key: string, name: string) => {
    if (checked) {
      dispatch(
        currentBodyRowsSlice.actions.setFilter({
          ...reduxFilter,
          [key]: { value: checked, name },
        }),
      );
    } else {
      dispatch(currentBodyRowsSlice.actions.setDisFilter(key));
    }
  };

  const handleSearch = (value: string, key: string) => {
    if (key === 'status') {
      setSelectedOption(value);
    }
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[key];
        return updatedFilters;
      });
    }
  };

  const iterableRows = (allRows: IRows[]) => {
    const initialState: IData = {};
    allRows.forEach((el) => {
      initialState[el.id] = {
        ...el,
        delivery_date: toDateUI(el.delivery_date),
      };
    });
    return initialState;
  };

  useEffect(() => {
    setAllRows(iterableRows(reduxRows));
  }, [reduxRows]);
  const options = [
    { value: '', label: 'all' },
    { value: 'active', label: 'active' },
    { value: 'archive', label: 'archive' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span>Выбрать</span>
              <input
                type='checkbox'
                checked={reduxMainCheckBox}
                onChange={(event) => handlerMainCheck(event.target.checked)}
              />
            </th>
            {columns.map((column) => {
              if (column.rowName === 'status') {
                return (
                  <th key={column.id}>
                    <Select
                      placeholder={'select status'}
                      defaultValue={selectedOption}
                      onChange={(event) => {
                        handleSearch(event.value, column.rowName);
                      }}
                      options={options}
                    />
                  </th>
                );
              }
              return (
                <th key={column.id}>
                  <span>{column.label}</span>
                  <input
                    type='search'
                    placeholder={`Поиск по ${column.label}`}
                    value={filters[column.rowName]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.rowName)
                    }
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Object.entries(allRows).map(([key, value]) => {
            return (
              <tr
                id={key}
                key={uuid()}
                style={{ color: reduxFilter[key] ? 'red' : 'black' }}
              >
                {Object.entries(value).map(([key2, val2]) => {
                  if (key2 === 'id') {
                    return (
                      <td key={uuid()}>
                        <input
                          type='checkbox'
                          checked={
                            !reduxFilter[key] ? false : reduxFilter[key].value
                          }
                          onChange={(event) =>
                            handlerOneCheck(
                              event.target.checked,
                              key,
                              value.name,
                            )
                          }
                        />
                      </td>
                    );
                  } else {
                    return <td key={uuid()}>{val2}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
