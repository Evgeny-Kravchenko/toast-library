import React, {createElement, useRef} from 'react';
import TestComponent from './TestComponent';
import { successTheme, errorTheme, warningTheme, infoTheme } from '../../default-themes';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import animations from '../../animations';

import Toasts from '../../services';

let toasts = new Toasts();

toasts = toasts
  .setType('error')
  .setTitle('Example error')
  .setPosition(10, 10)
  .setPadding(20, 20)
  .setDurationOfShowing(3000)
  .setDescription('Something went wrong')
  .setColorOfBackground('#ff44ff');

export default {
  title: 'TestComponent',
  decorators: [withKnobs],
};

export const Info = () => (
  <TestComponent
    theme={object('Style', infoTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'info')}
  />
);

export const Warning = () => (
  <TestComponent
    theme={object('Style', warningTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'warning')}
  />
);

export const Error = () => (
  <TestComponent
    theme={object('Style', errorTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'error')}
  />
);

export const Success = () => (
  <TestComponent
    theme={object('Style', successTheme)}
    animations={object('Animation', animations)}
    type={text('Type', 'success')}
  />
);

export const EnableButton = () => {
  const containerRef = useRef(null);
  const onClick = () => {
    toasts.setContainer(containerRef.current).show();
  };
  return (
    <>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '500px', position: 'relative', backgroundColor: 'gray' }}
      >
        Container
      </div>
      <button onClick={onClick}>Enable</button>
    </>
  );
};
