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
      options: {},
      isFade: false,
      isShown: false,
      startCoordinateX: null,
      isMouseButtonPressedDown: false,
    };
    this.toastWrapperRef = createRef();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClose);
    document.removeEventListener('onanimationend', this.onAnimationEnd);
    document.removeEventListener('onmousedown', this.onMouseDown);
  }

  onClose = () => {
    this.setIsShown(false);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.toastWrapperRef.current.parentElement.style.opacity = `1`;
    this.setState({ isFade: true });
  };

  onAnimationEnd = () => {
    const { isFade } = this.state;
    if (isFade) {
      this.hide();
    }
  };

  onMouseDown = (event) => {
    const { isMouseButtonPressedDown } = this.state;
    if (!isMouseButtonPressedDown) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      this.toastWrapperRef.current.parentElement.style.opacity = '0.3';
      this.setState({ startCoordinateX: event.pageX, isMouseButtonPressedDown: true });
    }
  };

  onMouseUp = () => {
    const {
      options: {
        position: { positionX },
        indents: { indentX },
      },
    } = this.state;
    this.toastWrapperRef.current.style[positionX] = `${indentX || DEFAULT_INDENT_X}px`;
    this.toastWrapperRef.current.parentElement.style.opacity = `1`;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.setState({ startCoordinateX: null, isMouseButtonPressedDown: false });
  };

  onMouseMove = (event) => {
    const {
      isMouseButtonPressedDown,
      options: {
        position: { positionX },
      },
    } = this.state;
    if (isMouseButtonPressedDown) {
      if (positionX === 'right') {
        this.toastWrapperRef.current.style[positionX] = `${
          window.innerWidth - event.pageX - this.toastWrapperRef.current.offsetWidth / 2
        }px`;
      } else {
        this.toastWrapperRef.current.style[positionX] = `${
          event.pageX - this.toastWrapperRef.current.offsetWidth / 2
        }px`;
      }
      this.isItNeededToHide(event.pageX);
    }
  };

  show(options) {
    const { setIsShown } = options;
    this.setIsShown = setIsShown;
    this.setState(() => ({ options, isShown: true, isFade: false }));
  }

  hide() {
    this.setState(() => {
      return { isShown: false, startCoordinateX: null, isMouseButtonPressedDown: false };
    });
  }

  isItNeededToHide = (x) => {
    if (x < 0 || x > window.innerWidth) {
      this.onClose();
    }
  };

  render() {
    const {
      options: {
        type = DEFAULT_TYPE,
        title,
        backgroundColor,
        description,
        position = DEFAULT_POSITION,
        indents = DEFAULT_INDENTS,
        animation,
        color,
      },
      isFade,
      isShown,
    } = this.state;
    position.positionX = position.positionX || DEFAULT_POSITION_X;
    position.positionY = position.positionY || DEFAULT_POSITION_Y;
    indents.indentX = indents.indentX || DEFAULT_INDENT_X;
    indents.indentY = indents.indentY || DEFAULT_INDENT_Y;
    let currentAnimation = null;
    if (animation) {
      currentAnimation = !isFade ? animation.appearance : animation.disappearance;
    }
    return (
      isShown && (
        <ToastWrapper
          color={color}
          animation={currentAnimation}
          backgroundColor={backgroundColor}
          position={position}
          indents={indents}
          onAnimationEnd={this.onAnimationEnd}
          onMouseDown={(event) => this.onMouseDown(event)}
          ref={this.toastWrapperRef}
        >
          <ToastHeader>
            <Title>{title}</Title>
            <CloseButton
              color={color}
              onClick={this.onClose}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
              </svg>
            </CloseButton>
          </ToastHeader>
          <ToastBody>
            <ImageType color={color} type={type} />
            <ToastDescription>{description}</ToastDescription>
          </ToastBody>
        </ToastWrapper>
      )
    );
  }
}
