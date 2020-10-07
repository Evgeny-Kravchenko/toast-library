import React, { Component } from 'react';

import ImageType from 'src/components/ImageType';

import {
  ToastWrapper,
  CloseButton,
  Title,
  ToastBody,
  ToastDescription,
  ToastHeader,
} from './styled-components';

import { DEFAULT_INDENT_Y } from '../../constants';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfToasts: [],
      defaultIndentY: DEFAULT_INDENT_Y,
      currentPressedToast: null,
    };
  }

  onClose = (id) => {
    const { currentPressedToast } = this.state;
    if (currentPressedToast) {
      this.unsubscribeFromEvents();
      currentPressedToast.ref.current.style.setProperty('opacity', '1');
    }
    this.setState((prevState) => {
      return {
        arrayOfToasts: prevState.arrayOfToasts.map((toast) => {
          if (toast.id === id) {
            return {
              ...toast,
              isFade: true,
              isMouseButtonPressedDown: false,
            };
          }
          return toast;
        }),
        currentPressedToast: null,
      };
    });
  };

  onAnimationEnd = (id, isFade) => {
    if (isFade) {
      this.hide(id);
    }
  };

  onMouseDown = (event, id) => {
    const { arrayOfToasts } = this.state;
    const currentToast = arrayOfToasts.find((toast) => toast.id === id);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    currentToast.ref.current.style.setProperty('opacity', '0.3', 'important');
    currentToast.isMouseButtonPressedDown = true;
    this.setState((prevState) => ({
      ...prevState,
      currentPressedToast: currentToast,
      arrayOfToasts: prevState.arrayOfToasts.map((toast) => {
        if (toast.id === id) {
          return {
            ...toast,
            isMouseButtonPressedDown: true,
          };
        }
        return toast;
      }),
    }));
  };

  onMouseUp = () => {
    const { currentPressedToast, defaultIndentX } = this.state;
    const {
      position: { positionX },
    } = currentPressedToast;
    currentPressedToast.ref.current.style.setProperty('opacity', '1');
    this.unsubscribeFromEvents();
    currentPressedToast.ref.current.style[positionX] = `${defaultIndentX}px`;
    this.setState((prevState) => ({
      ...prevState,
      currentPressedToast: null,
      arrayOfToasts: prevState.arrayOfToasts.map((toast) => {
        if (toast.id === currentPressedToast.id) {
          return {
            ...toast,
            isMouseButtonPressedDown: false,
          };
        }
        return toast;
      }),
    }));
  };

  onMouseMove = (event) => {
    const {
      currentPressedToast: {
        isMouseButtonPressedDown,
        ref,
        position: { positionX },
      },
    } = this.state;
    if (isMouseButtonPressedDown) {
      if (positionX === 'right') {
        ref.current.style[positionX] = `${
          window.innerWidth - event.pageX - ref.current.offsetWidth / 2
        }px`;
      } else {
        ref.current.style[positionX] = `${event.pageX - ref.current.offsetWidth / 2}px`;
      }
      this.isItNeededToHide(event.pageX);
    }
  };

  unsubscribeFromEvents = () => {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  };

  isItNeededToHide = (x) => {
    const { currentPressedToast } = this.state;
    if (x < 0 || x > window.innerWidth) {
      this.onClose(currentPressedToast.id);
    }
  };

  show(options) {
    const { arrayOfToasts, onDelete, defaultIndentY, defaultIndentX } = options;
    this.onDeleteFromService = onDelete;
    this.setState({ arrayOfToasts, defaultIndentY, defaultIndentX });
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
              return {
                ...toast,
                indents: {
                  ...toast.indents,
                  indentY: arr[idx - 1].ref.current.offsetHeight + defaultIndentY + 10,
                },
              };
            }
            return {
              ...toast,
              indents: {
                ...toast.indents,
                indentY: prevState.defaultIndentY,
              },
            };
          }),
      };
    });
  }

  render() {
    const { arrayOfToasts } = this.state;
    return arrayOfToasts.map((options) => {
      const {
        animation,
        color,
        backgroundColor,
        position,
        indents,
        isFade,
        id,
        ref,
        title,
        description,
        type,
      } = options;
      let currentAnimation = null;
      if (animation) {
        currentAnimation = !isFade ? animation.appearance : animation.disappearance;
      }
      return (
        <ToastWrapper
          color={color}
          animation={currentAnimation}
          backgroundColor={backgroundColor}
          position={position}
          indents={indents}
          onAnimationEnd={() => this.onAnimationEnd(id, isFade)}
          onMouseDown={(event) => this.onMouseDown(event, id)}
          ref={ref}
          key={id}
        >
          <ToastHeader>
            <Title>{title}</Title>
            <CloseButton
              color={color}
              onClick={() => this.onClose(id)}
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
      );
    });
  }
}
