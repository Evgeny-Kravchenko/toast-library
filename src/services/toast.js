import { createRef } from 'react';
import animations from '../animations';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_INDENT_X,
  DEFAULT_INDENT_Y,
  DEFAULT_POSITION_X,
  DEFAULT_POSITION_Y,
  DEFAULT_TITLE,
} from '../constants';
import { defaultThemes } from '../default-themes';
import { DEFAULT_TEXT_COLOR } from '../default-themes/constants';

export default class Toasts {
  static _instance = null;

  type;

  title = DEFAULT_TITLE;

  description = DEFAULT_DESCRIPTION;

  backgroundColor;

  refToastContainer;

  positionX = DEFAULT_POSITION_X;

  positionY = DEFAULT_POSITION_Y;

  showingDuration;

  indentX = DEFAULT_INDENT_X;

  indentY = DEFAULT_INDENT_Y;

  animation;

  arrayOfToasts = [];

  toastsRefs = [];

  lastPositionsOfToastsInTheDifferentPartsOfWindow = {
    'left-bottom': 5,
    'left-top': 5,
    'right-bottom': 5,
    'right-top': 5,
  };

  constructor(refToastContainer) {
    if (Toasts._instance) {
      return Toasts._instance;
    }
    this.refToastContainer = refToastContainer;
    Toasts._instance = this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(descr) {
    this.description = descr;
    return this;
  }

  setColorOfBackground(color) {
    this.backgroundColor = color;
    return this;
  }

  setPosition(x, y) {
    this.positionX = x;
    this.positionY = y;
    return this;
  }

  setShowingDuration(ms) {
    this.showingDuration = ms;
    return this;
  }

  setIndent(x, y) {
    this.indentX = x;
    this.indentY = y;
    return this;
  }

  setAnimation(animationName) {
    if (Object.prototype.hasOwnProperty.call(animations, animationName)) {
      this.animation = animations[animationName];
    }
    return this;
  }

  onDelete = (id) => {
    let positionsString = null;
    this.arrayOfToasts = this.arrayOfToasts
      .filter((item) => {
        if (item.id === id) {
          positionsString = Object.values(item.position).join('-');
        }
        return item.id !== id;
      })
      .map((toast, idx) => {
        if (idx !== 0) {
          return {
            ...toast,
            indents: {
              ...toast.indents,
              indentY: this.toastsRefs[idx - 1].ref.current.offsetHeight + this.indentY + 10,
            },
          };
        }
        return {
          ...toast,
          indents: {
            ...toast.indents,
            indentY: this.indentY,
          },
        };
      });
    console.log(positionsString);
    this.toastsRefs = this.toastsRefs.filter((item) => item.id !== id);
  };

  _setToastsRef = (arr) => {
    this.toastsRefs = arr;
  };

  _setLastPositionOfToast = (positionX, positionY, id) => {
    const lastPosition = this.lastPositionsOfToastsInTheDifferentPartsOfWindow[
      `${positionX}-${positionY}`
    ];
    const ref = this.toastsRefs.find((item) => item.id === id).ref;
    this.lastPositionsOfToastsInTheDifferentPartsOfWindow[`${positionX}-${positionY}`] =
      lastPosition + ref.current.offsetHeight + 10;
  };

  _getLastPositionToast(positionX, positionY) {
    return this.lastPositionsOfToastsInTheDifferentPartsOfWindow[`${positionX}-${positionY}`];
  }

  async show() {
    const {
      type,
      positionX,
      positionY,
      indentX,
      indentY,
      showingDuration,
      setIsShown,
      arrayOfToasts,
      title,
      description,
      backgroundColor = (type && defaultThemes[type].backgroundColor) || DEFAULT_BACKGROUND_COLOR,
    } = this;
    const color = (type && defaultThemes[type].color) || DEFAULT_TEXT_COLOR;
    if (arrayOfToasts.length >= 3) {
      return;
    }
    const position = { positionX, positionY };
    const indents = { indentX, indentY };
    const id = String(Math.round(Math.random() * 10e6));
    indents.indentY = this._getLastPositionToast(positionX, positionY) || indentY;

    const animation = this.animation || animations.slide;
    const timerId =
      showingDuration &&
      setTimeout(() => {
        this.refToastContainer.current.setIsFadeForOneToasts(id, true);
        clearTimeout(timerId);
      }, showingDuration);
    this.arrayOfToasts.push({
      type,
      backgroundColor,
      title,
      description,
      position,
      showingDuration,
      indents,
      animation,
      setIsShown,
      color,
      id,
      timerId,
      ref: createRef(),
      isFade: false,
      isMouseButtonPressedDown: false,
    });

    await this.refToastContainer.current.show({
      arrayOfToasts: this.arrayOfToasts,
      onDelete: this.onDelete,
      defaultIndentY: this.indentY,
      defaultIndentX: this.indentX,
      setToastsRefs: this._setToastsRef,
    });

    this._setLastPositionOfToast(positionX, positionY, id);
  }

  hide() {
    if (this.arrayOfToasts.length === 0) {
      return;
    }
    this.refToastContainer.current.setState({
      arrayOfToasts: this.arrayOfToasts.map((item) => ({ ...item, isFade: true })),
    });
    this.arrayOfToasts = [];
    this.toastsRefs = [];
    this.lastPositionsOfToastsInTheDifferentPartsOfWindow = {
      'left-bottom': 5,
      'left-top': 5,
      'right-bottom': 5,
      'right-top': 5,
    };
  }
}
