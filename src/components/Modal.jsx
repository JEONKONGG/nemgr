import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');   // cd .. 와 같은 의미 (이전 페이지)
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  )
}

export default Modal;