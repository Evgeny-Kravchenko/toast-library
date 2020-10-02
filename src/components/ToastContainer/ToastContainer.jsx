import React, { useLayoutEffect, useRef, useState } from 'react';
import { infoTheme } from '../../default-themes';

import Toast from '../Toast';
import animations from '../../animations';
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
      animations={animations}
      theme={infoTheme}
    />
  );
};

export { ToastContainer, toastManager };
