import React from 'react';
import TestComponent from './TestComponent';
import { successTheme, errorTheme, warningTheme, infoTheme } from '../../default-themes';
import { withKnobs, object } from '@storybook/addon-knobs';
import animations from '../../animations';

export default {
  title: 'TestComponent',
  decorators: [withKnobs],
};

export const Info = () => (
  <TestComponent theme={object('Style', infoTheme)} animations={animations} type="info" />
);

export const Warning = () => (
  <TestComponent theme={object('Style', warningTheme)} animations={animations} type="warning" />
);

export const Error = () => (
  <TestComponent theme={object('Style', errorTheme)} animations={animations} type="error" />
);

export const Success = () => (
  <TestComponent theme={object('Style', successTheme)} animations={animations} type="success" />
);
