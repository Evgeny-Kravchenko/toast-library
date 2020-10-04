import React, { useLayoutEffect, useRef } from 'react';

import Toast from '../Toast';
import Toasts from '../../services';
import Portal from '../Portal/Portal';

// eslint-disable-next-line import/no-mutable-exports
let toastManager = null;

const ToastContainer = () => {
  const toastRef = useRef();
  useLayoutEffect(() => {
    toastManager = new Toasts(toastRef);
  }, []);
  return (
    <Portal>
      <Toast ref={toastRef} />
    </Portal>
  );
};

export { ToastContainer, toastManager };
