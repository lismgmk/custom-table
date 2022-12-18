import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/Modal.scss';

const Modal = ({
  isShowing,
  hide,
  reduxFilter,
}: {
  isShowing: boolean;
  hide: (val: { clear?: boolean; param?: boolean }) => void;
  reduxFilter: { [key: string]: { value: boolean; name: string } };
}) => {
  const allValues = () => {
    // const allId = Object.keys(reduxFilter);
    // const result: { allId: string[]; allNames: string[] } = {
    //   allId: [],
    //   allNames: [],
    // };
    // const result: string[]=[]
    return Object.values(reduxFilter)
      .map((value) => {
        // Object.entries(reduxFilter).forEach(([key, value]) => {
        //   result.allId.push(key);
        return value.name;
      })
      .join(', ');
    // return result;
  };
  //   useEffect(()=>{

  //   },[reduxFilter])

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-overlay' />
          <div
            className='modal-wrapper'
            aria-modal
            aria-hidden
            tabIndex={-1}
            role='dialog'
          >
            <div className='modal'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='modal-close-button'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={() => hide({})}
                >
                  &times;
                </button>
              </div>
              <p>
                Вы уверены что хотите аннулировать товар(ы):
                <pre> {allValues()}</pre>
              </p>
              <div>
                <button onClick={() => hide({ clear: true, param: true })}>
                  Применить
                </button>
                <button onClick={() => hide({ clear: true })}>Отклонить</button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Modal;
