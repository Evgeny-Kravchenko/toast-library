import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ToastContainer, toastManager } from './ToastContainer';

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = () => {
    toastManager.show();
  };
  const onHide = () => {
    toastManager.hide();
  };
  return (
    <>
      <ToastContainer />
      <button onClick={onShow}>Show</button>
      <button onClick={onHide}>Hide</button>
    </>
  );
};
