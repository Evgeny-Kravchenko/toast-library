import React, { useLayoutEffect, useRef } from 'react';

import Toast from '../Toast';
import Toasts from '../../services';

// eslint-disable-next-line import/no-mutable-exports
let toastManager = null;

const ToastContainer = () => {
  const toastRef = useRef();
  useLayoutEffect(() => {
    toastManager = new Toasts(toastRef);
  }, []);
  return <Toast ref={toastRef} />;
};

export { ToastContainer, toastManager };
