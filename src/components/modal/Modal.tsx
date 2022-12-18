import React from 'react';
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
    return Object.values(reduxFilter)
      .map((value) => {
        return value.name;
      })
      .join(', ');
  };

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
