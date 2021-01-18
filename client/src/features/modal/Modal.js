import React from 'react';

import styles from './Modal.module.css';

// Inspired by the link bellow
// https://github.com/dsternlicht/the-ultimate-guide-for-creating-a-simple-modal-in-react-vue-angular-and-vanilla-js/tree/master/react
export const Modal = ({ children, show, closeCallback, title }) => (
  <div className={styles.modal} style={{ display: show ? 'block' : 'none'}}>
    <div className={styles.overlay} onClick={closeCallback}></div>
    <div className={styles.modal_content}>
        <h2>{title}</h2>
        <hr />
        <div>
          {children}
        </div>
      <button title="Close" className={styles.close_modal} onClick={closeCallback}>
        X
      </button>
    </div>
  </div>
);
