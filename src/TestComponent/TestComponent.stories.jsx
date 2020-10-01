import React from 'react';
import TestComponent from './TestComponent';
import { successTheme, errorTheme, warningTheme, infoTheme } from '../default-themes';

export default {
  title: 'TestComponent',
};

export const Info = () => <TestComponent theme={infoTheme} />;

export const Warning = () => <TestComponent theme={warningTheme} />;

export const Error = () => <TestComponent theme={errorTheme} />;

export const Success = () => <TestComponent theme={successTheme} />;
