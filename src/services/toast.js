import animations from '../animations';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '../constants';
import { defaultThemes } from '../default-themes';
import { DEFAULT_TEXT_COLOR } from '../default-themes/constants';
import { createRef } from 'react';

export default class Toasts {
  static _instance = null;

  type = null;

  title = null;

  description = null;

  backgroundColor = null;

  refToastContainer = null;

  positionX = null;

  positionY = null;

  showingDuration = null;

  indentX = null;

  indentY = null;

  animation = null;

  arrayOfToasts = [];

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
    clearTimeout(this.arrayOfToasts.find((item) => item.id === id).timerId);
    this.arrayOfToasts = this.arrayOfToasts.filter((item) => item.id !== id);
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
    } = this;
    if (arrayOfToasts.length >= 3) {
      return;
    }
    const title = this.title || DEFAULT_TITLE;
    const description = this.description || DEFAULT_DESCRIPTION;
    const backgroundColor =
      this.backgroundColor ||
      (type && defaultThemes[type].backgroundColor) ||
      DEFAULT_BACKGROUND_COLOR;
    const color = (type && defaultThemes[type].color) || DEFAULT_TEXT_COLOR;
    const position = { positionX, positionY };
    const indents = { indentX, indentY };
    if (this.arrayOfToasts.length !== 0) {
      indents.indentY =
        window.innerHeight -
        this.arrayOfToasts[this.arrayOfToasts.length - 1].ref.current.offsetTop +
        10;
    }

    const animation = this.animation || animations.slide;
    const id = String(Math.round(Math.random() * 10e6));
    const timerId =
      showingDuration &&
      setTimeout(() => this.refToastContainer.current.onClose(id), showingDuration);
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
    });

    await this.refToastContainer.current.show({
      arrayOfToasts: this.arrayOfToasts,
      onDelete: this.onDelete,
      defaultIndentY: this.indentY,
    });
  }
}
