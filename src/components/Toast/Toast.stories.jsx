import React from 'react';
import Toast from './Toast';
import { successTheme, errorTheme, warningTheme, infoTheme } from '../../default-themes';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import animations from '../../animations';

export default {
  title: 'Toast',
  decorators: [withKnobs],
};

export const Info = () => (
  <Toast
    theme={object('Style', infoTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'info')}
  />
);

export const Warning = () => (
  <Toast
    theme={object('Style', warningTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'warning')}
  />
);

export const Error = () => (
  <Toast
    theme={object('Style', errorTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'error')}
  />
);

export const Success = () => (
  <Toast
    theme={object('Style', successTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'success')}
  />
);
