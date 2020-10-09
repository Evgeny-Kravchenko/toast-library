import React, { useLayoutEffect, useRef } from 'react';

import ErrorBoundary from 'src/components/ErrorBoundary';
import ToastList from '../ToastsList';
import Toasts from '../../services';

// eslint-disable-next-line import/no-mutable-exports
let toastManager = null;

const ToastContainer = () => {
  const toastRef = useRef();
  useLayoutEffect(() => {
    toastManager = new Toasts(toastRef);
  }, []);
  return (
    <ErrorBoundary>
      <ToastList ref={toastRef} />
    </ErrorBoundary>
  );
};

export { ToastContainer, toastManager };
