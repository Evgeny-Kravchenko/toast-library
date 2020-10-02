import React, { useLayoutEffect, useRef } from 'react';
import { infoTheme } from '../../default-themes';

import Toast from '../Toast';
import Toasts from '../../services';

let toastManager = null;

const ToastContainer = () => {
  const toastRef = useRef();
  useLayoutEffect(() => {
    toastManager = new Toasts(toastRef);
  });
  return (
    <Toast
      ref={toastRef}
      theme={infoTheme}
    />
  );
};

export { ToastContainer, toastManager };
