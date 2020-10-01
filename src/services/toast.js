export default class Toasts {
  static _instance = null;
  countOfShowedToasts = null;
  positionX;
  positionY;
  type;
  durationOfShowing;
  title;
  description;
  paddingX;
  paddingY;
  colorBackground;
  animationName;

  constructor() {
    if (Toasts._instance) {
      return Toasts._instance;
    }
    Toasts._instance = this;
  }

  setPosition(x, y) {
    this.positionX = x;
    this.positionY = y;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setDurationOfShowing(ms) {
    this.durationOfShowing = ms;
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

  setPadding(x, y) {
    this.paddingX = x;
    this.paddingY = y;
    return this;
  }

  setColorOfBackground(color) {
    this.colorBackground = color;
    return this;
  }

  setAnimationOfShowingAndHidden(animation) {
    this.animationName = animation;
    return this;
  }

  show() {
    console.log(this);
  }
}
