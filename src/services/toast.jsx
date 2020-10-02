import React from 'react';
import animations from '../animations';

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

  show() {
    const type = this.type;
    const title = this.title;
    const description = this.description;
    const backgroundColor = this.backgroundColor;
    const positionX = this.positionX;
    const positionY = this.positionY;
    const position = { positionX, positionY };
    const showingDuration = this.showingDuration;
    const indentX = this.indentX;
    const indentY = this.indentY;
    const indents = { indentX, indentY };
    const animation = this.animation;
    this.refToastContainer.current.show({
      type,
      backgroundColor,
      title,
      description,
      position,
      showingDuration,
      indents,
      animation,
    });
  }

  hide() {
    this.refToastContainer.current.hide();
  }
}
