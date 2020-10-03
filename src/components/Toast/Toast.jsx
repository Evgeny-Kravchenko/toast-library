import React, { Component } from 'react';

import ImageType from '../ImageType';
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
    };
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClose);
    window.removeEventListener('onanimationend', this.onAnimationEnd);
  }

  onClose = () => {
    this.setIsShown(false);
    this.setState({ isFade: true });
  };

  onAnimationEnd = () => {
    const { isFade } = this.state;
    if (isFade) {
      this.hide();
    }
  };

  show(options) {
    const { setIsShown } = options;
    this.setIsShown = setIsShown;
    this.setState(() => ({ options, isShown: true, isFade: false }));
  }

  hide() {
    this.setState(() => {
      return { isShown: false };
    });
  }

  render() {
    const { theme } = this.props;
    const {
      type = DEFAULT_TYPE,
      title,
      backgroundColor,
      description,
      position = DEFAULT_POSITION,
      indents = DEFAULT_INDENTS,
      animation,
    } = this.state.options;
    position.positionX = position.positionX || DEFAULT_POSITION_X;
    position.positionY = position.positionY || DEFAULT_POSITION_Y;
    indents.indentX = indents.indentX || DEFAULT_INDENT_X;
    indents.indentY = indents.indentY || DEFAULT_INDENT_Y;
    let currentAnimation = null;
    if (animation) {
      currentAnimation = !this.state.isFade ? animation.appearance : animation.disappearance;
    }
    return (
      this.state.isShown && (
        <ToastWrapper
          theme={theme}
          animation={currentAnimation}
          backgroundColor={backgroundColor}
          position={position}
          indents={indents}
          onAnimationEnd={this.onAnimationEnd}
        >
          <ToastHeader>
            <Title>{title}</Title>
            <CloseButton theme={theme} onClick={this.onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
              </svg>
            </CloseButton>
          </ToastHeader>
          <ToastBody>
            <ImageType theme={theme} type={type} />
            <ToastDescription>{description}</ToastDescription>
          </ToastBody>
        </ToastWrapper>
      )
    );
  }
}
