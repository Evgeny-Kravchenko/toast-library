import animations from '../animations';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '../constants';
import { defaultThemes } from '../default-themes';

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

  isShown = false;

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
    if (animations.hasOwnProperty(animationName)) {
      this.animation = animations[animationName];
    }
    return this;
  }

  setIsShown = (value) => {
    if (!value) {
      clearTimeout(this.timerId);
    }
    this.isShown = value;
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
      isShown,
    } = this;
    if (isShown) {
      return;
    }
    const title = this.title || DEFAULT_TITLE;
    const description = this.description || DEFAULT_DESCRIPTION;
    const backgroundColor =
      this.backgroundColor ||
      (type && defaultThemes[type].backgroundColor) ||
      DEFAULT_BACKGROUND_COLOR;
    const position = { positionX, positionY };
    const indents = { indentX, indentY };
    const animation = this.animation || animations.slide;
    this.setIsShown(true);
    await this.refToastContainer.current.show({
      type,
      backgroundColor,
      title,
      description,
      position,
      showingDuration,
      indents,
      animation,
      setIsShown,
      isShown,
    });
    this.timerId =
      showingDuration && this.isShown && setTimeout(() => this.hide(), showingDuration);
  }

  hide() {
    if (this.isShown) {
      clearTimeout(this.timerId);
      this.refToastContainer.current.onClose();
    }
  }
}
