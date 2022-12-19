import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../../redux/slices/currentBodyRows';
import { RootState } from '../../redux/store';
import { cancelFetch } from '../../server/utils';
import './Application.scss';
import { IResponse } from '../../global-dto/data.interface';
import useModal from '../modal/hooks/modal.hook';
import Modal from '../modal/Modal';
import Table from '../table/Table';
import { countEmont } from '../../helpers/countAmount';

const AppPage = () => {
  const [resultValues, setResultValues] = useState<{
    sumVolume: number;
    sumQnt: number;
  }>({ sumVolume: 0, sumQnt: 0 });

  const [fetchData, setFetchData] = useState<{
    data: IResponse[];
    loading: boolean;
  }>({ data: null, loading: null });

  const urls: string[] = [
    'http://localhost:3000/documents1',
    'http://localhost:3000/documents2',
  ];

  const getData = async () => {
    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const promises = responses.map((response) => response.json());
    const data = await Promise.all(promises);
    const result = data.flat();
    setFetchData({ data: result, loading: false });
  };
  useEffect(() => {
    setFetchData({ data: null, loading: true });
    getData();
  }, []);
  const dispatch = useAppDispatch();
  const redux = useSelector((state: RootState) => state.currentBodyRows);

  useEffect(() => {
    if (fetchData.data && fetchData.data.length > 0) {
      dispatch(currentBodyRowsSlice.actions.setInitialRows(fetchData.data));
    }
  }, [fetchData.data]);

  useEffect(() => {
    const sumVolume = countEmont(redux.allRows, 'volume');
    const sumQnt = countEmont(redux.allRows, 'qty');
    setResultValues(() => ({
      sumVolume,
      sumQnt,
    }));
  }, [redux.allRows]);

  const { isShowing, toggle } = useModal();

  const smartClose = async (options: { clear?: boolean; param?: boolean }) => {
    if (options.clear) {
      dispatch(currentBodyRowsSlice.actions.setFilter({}));
      dispatch(currentBodyRowsSlice.actions.setMainCheckBox(false));
    }
    if (options.param) {
      console.log('senddd');
      await cancelFetch({ list: Object.keys(redux.filters) });
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

  if (fetchData.loading || !fetchData.data) {
    return <div>loading...</div>;
  }

  return (
    <div className='App'>
      <h1>Таблица товаров</h1>
      <Table />
      <h3>Общее количесво : {resultValues.sumQnt}</h3>
      <h3>Общий объем : {resultValues.sumVolume}</h3>
      <button className='button-default' onClick={toggle}>
        Аннулировать
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
