import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Modal.scss';

const Modal = ({ isShowing, hide }: { isShowing: boolean; hide: (val: string) => void }) =>
  isShowing
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
                  onClick={()=>hide('close')}
                >
                  &times;
                </button>
              </div>
              <p>Вы уверены что хотите аннулировать товар(ы):</p>
              <div>
                <button>Применить</button>
                <button onClick={()=>hide('closeUncheck')}>Отклонить</button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;

export default Modal;
