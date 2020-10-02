import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ToastContainer from './ToastContainer';
import Toast from '../../services';

const toast = new Toast();

export default {
  title: 'Sandbox',
  decorators: [withKnobs],
};

export const Sandbox = () => {
  const onShow = () => {
    toast.show();
  };
  const onHide = () => {
    toast.hide();
  };
  return (
    <>
      <ToastContainer />
      <button onClick={onShow}>Show</button>
      <button onClick={onHide}>Hide</button>
    </>
  );
};
