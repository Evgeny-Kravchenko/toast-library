import React from 'react';
import TestComponent from './TestComponent';
import { successTheme, errorTheme, warningTheme, infoTheme } from '../../default-themes';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'TestComponent',
  decorators: [withKnobs],
};

export const Info = () => <TestComponent theme={(object('Style', infoTheme))} />;

export const Warning = () => <TestComponent theme={warningTheme} />;

export const Error = () => <TestComponent theme={errorTheme} />;

export const Success = () => <TestComponent theme={successTheme} />;
