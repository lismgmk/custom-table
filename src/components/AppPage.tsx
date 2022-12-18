import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../redux/slices/currentBodyRows';
import { RootState } from '../redux/store';
import './Application.scss';
import { IResponse } from './dto/data.interface';
import { countEmont } from './helpers/countAmount';
import useModal from './modal/hooks/modal.hook';
import Modal from './modal/Modal';
import './modal/styles/Modal.scss';
import Table from './Table';

const AppPage: React.FC = () => {
  const [resultValues, setResultValues] = useState<{
    sumVolume: number;
    sumQnt: number;
  }>({ sumVolume: 0, sumQnt: 0 });

  const rows: IResponse[] = [
    {
      id: '111',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box1',
      delivery_date: new Date().getDate().toString(),
      currency: 'USD',
    },
    {
      id: '2222',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box2',
      delivery_date: new Date().getDate().toString(),
      currency: 'USD',
    },
    {
      id: '3fdfdf',
      status: 'active',
      sum: 5,
      qty: 10,
      volume: 1000,
      name: 'box',
      delivery_date: new Date().toString(),
      currency: 'RUB',
    },
  ];
  const dispatch = useAppDispatch();
  const redux = useSelector((state: RootState) => state.currentBodyRows);
  useEffect(() => {
    dispatch(currentBodyRowsSlice.actions.setInitialRows(rows));
  }, []);

  useEffect(() => {
    const sumVolume = countEmont(redux.allRows, 'volume');
    const sumQnt = countEmont(redux.allRows, 'qty');
    setResultValues(() => ({
      sumVolume,
      sumQnt,
    }));
  }, [redux.allRows]);
  const { isShowing, toggle } = useModal();

  const smartClose = (options: { clear?: boolean; param?: boolean }) => {
    if (options.clear) {
      dispatch(currentBodyRowsSlice.actions.setFilter({}));
      dispatch(currentBodyRowsSlice.actions.setMainCheckBox(false));
    }
    if (options.param) {
      console.log('senddd');

      if (options.clear) {
        dispatch(currentBodyRowsSlice.actions.setFilter({}));
        dispatch(currentBodyRowsSlice.actions.setMainCheckBox(false));
      }
    }
    toggle();
  };
  const reduxFilter = useSelector(
    (state: RootState) => state.currentBodyRows.filters,
  );
  return (
    <div className='App'>
      <h1>Table</h1>
      <h2>Sorting, Filtering, Pagination</h2>

      <Table />
      <h3>Общее количесво : {resultValues.sumQnt}</h3>
      <h3>Общий объем : {resultValues.sumVolume}</h3>
      <button className='button-default' onClick={toggle}>
        Show Modal
      </button>
      <Modal
        reduxFilter={reduxFilter}
        isShowing={isShowing}
        hide={smartClose}
      />
    </div>
  );
};

export default AppPage;
