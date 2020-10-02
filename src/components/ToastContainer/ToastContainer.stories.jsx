import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ToastContainer, toastManager } from './ToastContainer';

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = () => {
    toastManager
      .setType('info')
      .setTitle('Info component')
      .setColorOfBackground('orange')
      .setDescription('Here is the custom description')
      .setPosition('bottom', 'left')
      .setShowingDuration(1000)
      .setIndent(25, 25)
      .show();
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
