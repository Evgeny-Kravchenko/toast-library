import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { toastManager, ToastContainer } from 'src';

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = () => {
    toastManager
      .setAnimation('puff')
      .setType('warning')
      .setTitle('Something went wrong')
      .setDescription(
        'Something went wrong and I assume that you must fix it. If you will not do it I will be disappointed'
      )
      .show();
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
