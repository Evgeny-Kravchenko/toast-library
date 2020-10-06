import React, { Component, createRef } from 'react';

import ImageType from 'src/components/ImageType';

import {
  ToastWrapper,
  CloseButton,
  Title,
  ToastBody,
  ToastDescription,
  ToastHeader,
} from './styled-components';

import {
  DEFAULT_POSITION_X,
  DEFAULT_POSITION_Y,
  DEFAULT_POSITION,
  DEFAULT_TYPE,
  DEFAULT_INDENT_X,
  DEFAULT_INDENT_Y,
  DEFAULT_INDENTS,
} from '../../constants';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfToasts: [],
      defaultIndentY: DEFAULT_INDENT_Y,
    };
  }

  onClose = (id) => {
    this.setState((prevState) => {
      return {
        arrayOfToasts: prevState.arrayOfToasts.map((toast) => {
          if (toast.id === id) {
            return {
              ...toast,
              isFade: true,
            };
          }
          return toast;
        }),
      };
    });
  };

  onAnimationEnd = (id, isFade) => {
    if (isFade) {
      this.hide(id);
    }
  };

  show(options) {
    let { arrayOfToasts, onDelete, defaultIndentY } = options;
    this.onDeleteFromService = onDelete;
    this.setState({ arrayOfToasts, defaultIndentY });
  }

  hide(id) {
    const { defaultIndentY } = this.state;
    this.onDeleteFromService(id);
    this.setState((prevState) => {
      return {
        arrayOfToasts: prevState.arrayOfToasts
          .filter((toast) => toast.id !== id)
          .map((toast, idx, arr) => {
            if (idx !== 0) {
              toast.indents.indentY =
                arr[idx - 1].ref.current.offsetHeight + defaultIndentY + 10;
            } else {
              toast.indents.indentY = this.state.defaultIndentY;
            }
            return toast;
          }),
      };
    });
  }

  isItNeededToHide = (x) => {
    if (x < 0 || x > window.innerWidth) {
      this.onClose();
    }
  };

  render() {
    const { arrayOfToasts } = this.state;
    return arrayOfToasts.map((options) => {
      let currentAnimation = null;
      if (options.animation) {
        currentAnimation = !options.isFade
          ? options.animation.appearance
          : options.animation.disappearance;
      }
      return (
        <ToastWrapper
          color={options.color}
          animation={currentAnimation}
          backgroundColor={options.backgroundColor}
          position={options.position}
          indents={options.indents}
          onAnimationEnd={() => this.onAnimationEnd(options.id, options.isFade)}
          onMouseDown={(event) => this.onMouseDown(event)}
          ref={options.ref}
          key={options.id}
        >
          <ToastHeader>
            <Title>{options.title}</Title>
            <CloseButton
              color={options.color}
              onClick={() => this.onClose(options.id)}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
              </svg>
            </CloseButton>
          </ToastHeader>
          <ToastBody>
            <ImageType color={options.color} type={options.type} />
            <ToastDescription>{options.description}</ToastDescription>
          </ToastBody>
        </ToastWrapper>
      );
    });
  }
}
