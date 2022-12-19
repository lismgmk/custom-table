import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { countEmont } from '../../helpers/countAmount';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';
import { currentBodyRowsSlice } from '../../redux/slices/currentBodyRows';
import { RootState } from '../../redux/store';
import { cancelFetch, urls } from '../../server/utils';
import useModal from '../modal/hooks/modal.hook';
import Modal from '../modal/Modal';
import Table from '../table/Table';
import '@src/components/main-page/styles/appPage.scss';
import { useFetchData } from './hooks/fetchData.hook';

const AppPage = () => {
  const { fetchData, loading } = useFetchData(urls);

  const [resultValues, setResultValues] = useState<{
    sumVolume: number;
    sumQnt: number;
  }>({ sumVolume: 0, sumQnt: 0 });
  const dispatch = useAppDispatch();
  const redux = useSelector((state: RootState) => state.currentBodyRows);
  const { isShowing, toggle } = useModal();

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

  const smartClose = async (options: { clear?: boolean; param?: boolean }) => {
    if (options.clear) {
      dispatch(currentBodyRowsSlice.actions.setFilter({}));
      dispatch(currentBodyRowsSlice.actions.setMainCheckBox(false));
    }
    if (options.param) {
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

  if (loading) {
    return <div>loading...</div>;
  }
  if (fetchData.error) {
    return <div>{fetchData.error}</div>;
  }
  return (
    <div className='application'>
      <h1>Таблица товаров</h1>
      <Table />
      <div className='application-footer'>
        <div>
          <h3>Общее количесво : {resultValues.sumQnt}</h3>
          <h3>Общий объем : {resultValues.sumVolume}</h3>
        </div>
        <button className='button-default' onClick={toggle}>
          Аннулировать
        </button>
      </div>

      <Modal
        reduxFilter={reduxFilter}
        isShowing={isShowing}
        hide={smartClose}
      />
    </div>
  );
};

export default AppPage;
