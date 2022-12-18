import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../redux/slices/currentBodyRows';
import { RootState } from '../redux/store';
import { IData, IRows } from './dto/data.interface';

const columns = [
  { rowName: 'name', label: 'Name' },
  { rowName: 'sum', label: 'Sum' },
  { rowName: 'qty', label: 'Quontity' },
  { rowName: 'volume', label: 'Volume' },
  { rowName: 'status', label: 'Status' },
  { rowName: 'delivery_date', label: 'Date' },
  { rowName: 'currency', label: 'Currency' },
  { rowName: 'all', label: 'All' },
];

const Table = () => {
  const [allRows, setAllRows] = useState<IData>({});
  // const [checkBoxOne, setCheckBoxOne] = useState<{
  //   [key: string]: { value: boolean; name: string };
  // }>({});
  const dispatch = useAppDispatch();
  const redux = useSelector((state: RootState) => state.currentBodyRows);
  const reduxMainCheckBox = useSelector(
    (state: RootState) => state.currentBodyRows.mainCheckBox,
  );
  const reduxFilter = useSelector(
    (state: RootState) => state.currentBodyRows.filters,
  );
  const [filters, setFilters] = useState<{
    [key: string]: string;
  }>({});
  // const [mainCheck, setMainCheck] = useState<boolean>(false);

  useEffect(() => {
    dispatch(currentBodyRowsSlice.actions.filterRows(filters));
  }, [filters]);

  const initialCheckBox = () => {
    const fullCheck: { [key: string]: { value: boolean; name: string } } = {};

    Object.entries(allRows).forEach(([key, value]) => {
      if (reduxMainCheckBox) {
        fullCheck[key] = { value: reduxMainCheckBox, name: value.name };
      }
      // if (mainCheck) {
      //   fullCheck[key] = { value: mainCheck, name: value.name };
      // }
    });

    return fullCheck;
  };

  // useMemo(() => {
  //   // setCheckBoxOne(initialCheckBox());
  //   dispatch(currentBodyRowsSlice.actions.setFilter(initialCheckBox()));
  // }, [reduxMainCheckBox]);
  // }, [mainCheck]);

  // useEffect(() => {
  //   // console.log(Object.keys(allRows).length, 'ssssssssss');
  //   if (Object.keys(allRows).length === 0) {
  //     setMainCheck(false);
  //   } else if (
  //     Object.keys(checkBoxOne).length === Object.keys(allRows).length
  //   ) {
  //     setMainCheck(true);
  //   } else {
  //     setMainCheck(false);
  //   }
  // }, [checkBoxOne, allRows]);

  // useEffect(() => {
  //   dispatch(currentBodyRowsSlice.actions.setFilter(checkBoxOne));
  // }, [checkBoxOne]);

  const handlerMainCheck = (checked: boolean) => {
    // setMainCheck(checked);
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
      // setCheckBoxOne((previos) => ({
      //   ...previos,
      //   [key]: { value: checked, name },
      // }));
    } else {
      dispatch(currentBodyRowsSlice.actions.setDisFilter(key));
      // setCheckBoxOne((prevFilters) => {
      //   const updatedFilters = { ...prevFilters };
      //   delete updatedFilters[key];
      //   return updatedFilters;
      // });
    }
  };

  const handleSearch = (value: string, key: string) => {
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
      };
    });
    return initialState;
  };

  useEffect(() => {
    setAllRows(iterableRows(redux.allFilteredRows));
  }, [redux.allFilteredRows]);
  console.log(reduxFilter, 'rrrrrrrrrrrr!!!!!', reduxMainCheckBox);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span>Checked</span>
              <th>
                <input
                  type='checkbox'
                  checked={reduxMainCheckBox}
                  // checked={mainCheck}
                  onChange={(event) => handlerMainCheck(event.target.checked)}
                />
              </th>
            </th>
            {columns.map((column) => {
              return (
                <th key={column.rowName}>
                  <input
                    type='search'
                    placeholder={`Search ${column.label}`}
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
                key={`${key}_row`}
                // style={{ color: checkBoxOne[key] ? 'red' : 'black' }}
                style={{ color: reduxFilter[key] ? 'red' : 'black' }}
              >
                {Object.entries(value).map(([key2, val2]) => {
                  if (key2 === 'id') {
                    return (
                      <td key={`${key}_checkbox`}>
                        <input
                          type='checkbox'
                          checked={
                            // !checkBoxOne[key] ? false : checkBoxOne[key].value
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
                    return <td key={`${key}_checkbox`}>{val2}</td>;
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
