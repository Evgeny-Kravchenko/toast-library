import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { toastManager, ToastContainer } from 'src';

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = (positionX, positionY) => {
    toastManager
      .setPosition(positionX, positionY)
      .setType('info')
      .setTitle('It is very important information')
      .setDescription(
        'It is very important information and I think it is very important that you know about it.'
      )
      .setIndent(20, 20)
      .setColorOfBackground('rgba(0, 0, 0, 0.5)')
      .setAnimation('puff')
      .setShowingDuration(10000)
      .show();
  };
  const onHide = () => {
    toastManager.hide();
  };
  return (
    <>
      <ToastContainer />
      <button type="button" onClick={() => onShow('left', 'bottom')}>
        Show button 1
      </button>
      <button type="button" onClick={() => onShow('right', 'top')}>
        Show button 2
      </button>
      <button type="button" onClick={() => onShow('right', 'bottom')}>
        Show button 3
      </button>
      <button type="button" onClick={onHide}>
        Hide all buttons
      </button>
    </>
  );
};
