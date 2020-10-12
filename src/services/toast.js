import { createRef } from 'react';
import animations from 'src/animations';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_INDENT_X,
  DEFAULT_INDENT_Y,
  DEFAULT_POSITION_X,
  DEFAULT_POSITION_Y,
  DEFAULT_TITLE,
} from 'src/constants';
import { defaultThemes } from 'src/default-themes';
import { DEFAULT_TEXT_COLOR } from 'src/default-themes/constants';

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
    'left-bottom': DEFAULT_INDENT_Y,
    'left-top': DEFAULT_INDENT_Y,
    'right-bottom': DEFAULT_INDENT_Y,
    'right-top': DEFAULT_INDENT_Y,
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
    if (this.arrayOfToasts.length > 0) {
      return this;
    }
    Object.keys(this.lastPositionsOfToastsInTheDifferentPartsOfWindow).forEach((key) => {
      this.lastPositionsOfToastsInTheDifferentPartsOfWindow[key] = y;
    });
    return this;
  }

  setAnimation(animationName) {
    if (Object.prototype.hasOwnProperty.call(animations, animationName)) {
      this.animation = animations[animationName];
    }
    return this;
  }

  onDelete = (id) => {
    const { ref } = this.toastsRefs.find((item) => item.id === id);
    const deletedToast = this.arrayOfToasts.find((item) => item.id === id);
    if (!deletedToast) {
      return;
    }
    const { positionX, positionY } = deletedToast.position;
    const positionOfRemovingVideo = `${positionX}-${positionY}`;
    let indexOfRemovingVideo = null;
    this.arrayOfToasts = this.arrayOfToasts
      .filter((toast, idx) => {
        if (toast.id !== id) {
          return true;
        }
        indexOfRemovingVideo = idx;
        return false;
      })
      .map((toast, idx) => {
        const { positionX: x, positionY: y } = toast.position;
        if (positionOfRemovingVideo === `${x}-${y}` && idx + 1 > indexOfRemovingVideo) {
          return {
            ...toast,
            indents: {
              ...toast.indents,
              indentY: toast.indents.indentY - ref.current.offsetHeight - 10,
            },
          };
        }
        return toast;
      });
    this._setLastPositionOfToast(positionX, positionY, id, true);
    this.toastsRefs = this.toastsRefs.filter((item) => item.id !== id);
  };

  _setToastsRef = (arr) => {
    this.toastsRefs = arr;
  };

  _setLastPositionOfToast = (positionX, positionY, id, isDelete) => {
    const lastPosition = this.lastPositionsOfToastsInTheDifferentPartsOfWindow[
      `${positionX}-${positionY}`
    ];
    const { ref } = this.toastsRefs.find((item) => item.id === id);
    if (isDelete) {
      this.lastPositionsOfToastsInTheDifferentPartsOfWindow[`${positionX}-${positionY}`] =
        lastPosition - ref.current.offsetHeight - 10;
    } else {
      this.lastPositionsOfToastsInTheDifferentPartsOfWindow[`${positionX}-${positionY}`] =
        lastPosition + ref.current.offsetHeight + 10;
    }
  };

  _getLastPositionToast = (positionX, positionY) => {
    return this.lastPositionsOfToastsInTheDifferentPartsOfWindow[`${positionX}-${positionY}`];
  };

  _getNewArrayOfToastsFromService = () => {
    return this.arrayOfToasts;
  };

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

    indents.indentY = this._getLastPositionToast(positionX, positionY);

    const animation = this.animation || animations.slide;
    const timerId =
      showingDuration &&
      setTimeout(() => {
        this.arrayOfToasts = this.arrayOfToasts.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isFade: true,
            };
          }
          return item;
        });
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
      getNewArrayOfToastsFromService: this._getNewArrayOfToastsFromService,
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
    const { indentY } = this;
    this.lastPositionsOfToastsInTheDifferentPartsOfWindow = {
      'left-bottom': indentY,
      'left-top': indentY,
      'right-bottom': indentY,
      'right-top': indentY,
    };
  }
}
