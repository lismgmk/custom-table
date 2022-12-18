import { nanoid } from 'nanoid';
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
  const [checkBoxOne, setCheckBoxOne] = useState<{ [key: string]: boolean }>(
    {},
  );
  const dispatch = useAppDispatch();
  const redux = useSelector((state: RootState) => state.currentBodyRows);
  const [filters, setFilters] = useState<{
    [key: string]: string;
  }>({});
  const [mainCheck, setMainCheck] = useState<boolean>(false);
  useEffect(() => {
    dispatch(currentBodyRowsSlice.actions.filterRows(filters));
  }, [filters]);

  const initialCheckBox = () => {
    const fullCheck: { [key: string]: boolean } = {};
    Object.keys(redux.allFilteredRows).forEach((el) => {
      fullCheck[el] = mainCheck;
    });
    return fullCheck;
  };

  // useEffect(() => {
  //   setCheckBoxOne(initialCheckBox());
  // }, [redux]);

  useEffect(() => {
    setCheckBoxOne(initialCheckBox());
  }, [mainCheck]);

  useEffect(() => {
    dispatch(currentBodyRowsSlice.actions.setFilter(checkBoxOne));
  }, [checkBoxOne]);

  const handlerMainCheck = useMemo(
    () => (checked: boolean) => {
      setMainCheck(checked);
    },
    [],
  );
  const handlerOneCheck = (checked: boolean, key: string) => {
    if (checked) {
      setCheckBoxOne((previos) => ({
        ...previos,
        [key]: checked,
      }));
    } else {
      setCheckBoxOne((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[key];
        return updatedFilters;
      });
    }
  };

  const handleSearch = (value: string, key: string) => {
    // setActivePage(1);

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
    console.log(redux.allFilteredRows, '!!rows', allRows);

    setAllRows(iterableRows(redux.allFilteredRows));
  }, [redux.allFilteredRows]);
  console.log();
  
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
                  checked={mainCheck}
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
          {/* {redux.allFilteredRows.map((el, index) => {
            if (index === 0) {
              return (
                <td key={`${el.id}_checkbox`}>
                  <input
                    type='checkbox'
                    checked={checkBoxOne[key]}
                    onChange={(event) =>
                      handlerOneCheck(event.target.checked, key)
                    }
                  />
                </td>
              );
            }
            return (
              <tr
                id={el.id}
                key={`${el.id}_row`}
                style={{ color: checkBoxOne[el.id] ? 'red' : 'black' }}
              ></tr>
            );
          })} */}

          {/* //   return (
          //     <tr
          //       id={el.id}
          //       key={`${el.id}_row`}
          //       style={{ color: checkBoxOne[el.id] ? 'red' : 'black' }}
          //     >
          //       {if(index===0){
          //          return  <td key={`${key}_checkbox`}>
          //               <input
          //                 type='checkbox'
          //                 checked={checkBoxOne[key]}
          //                 onChange={(event) =>
          //                   handlerOneCheck(event.target.checked, key)
          //                 }
          //               />
          //             </td> 
          //       }} else{
          //          return <td key={`${key}_checkbox`}>{val2}</td>;
          //       }}
              
          //     </tr>
          //   );
          // })} */}
          {Object.entries(allRows).map(([key, value]) => {
            // {Object.entries(redux.allFilteredRows).map(([key, value]) => {
            return (
              <tr
                id={key}
                key={`${key}_row`}
                style={{ color: checkBoxOne[key] ? 'red' : 'black' }}
              >
                {Object.entries(value).map(([key2, val2]) => {
                  if (key2 === 'id') {
                    return (
                      <td key={`${key}_checkbox`}>
                        <input
                          type='checkbox'
                          checked={checkBoxOne[key]}
                          onChange={(event) =>
                            handlerOneCheck(event.target.checked, key)
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
