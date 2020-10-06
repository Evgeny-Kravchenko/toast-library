import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { toastManager, ToastContainer } from 'src';

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = () => {
    toastManager.setPosition('right', 'bottom').show();
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
