import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ToastContainer, toastManager } from './ToastContainer';

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = () => {
    toastManager.setAnimation('puff').setShowingDuration(3000).show();
  };
  const onHide = () => {
    toastManager.hide();
  };
  return (
    <>
      <ToastContainer />
      <button type="button" onClick={onShow}>
        Show
      </button>
      <button type="button" onClick={onHide}>
        Hide
      </button>
    </>
  );
};
