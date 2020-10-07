import React, { useLayoutEffect, useRef } from 'react';

import ErrorBoundary from 'src/components/ErrorBoundary';
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
    <ErrorBoundary>
      <Portal>
        <Toast ref={toastRef} />
      </Portal>
    </ErrorBoundary>
  );
};

export { ToastContainer, toastManager };
