import React, {useEffect, useRef} from 'react';
import { infoTheme } from '../../default-themes';

import Toast from '../Toast';
import animations from '../../animations';
import Toasts from "../../services";

const toastManager = new Toasts();

const ToastContainer = () => {
  const toastRef = useRef();
  useEffect(() => {
    toastManager.setRef(toastRef);
  });
  return <Toast ref={toastRef} animations={animations} theme={infoTheme} />;
};

export default ToastContainer;
