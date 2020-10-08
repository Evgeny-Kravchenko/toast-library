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
      .setPosition('right', 'bottom')
      .setType('info')
      .setTitle('It is very important information')
      .setDescription(
        'It is very important information and I think it is very important that you know about it.'
      )
      .setIndent(5, 5)
      .setColorOfBackground('rgba(0, 0, 0, 0.5)')
      .setAnimation('puff')
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
