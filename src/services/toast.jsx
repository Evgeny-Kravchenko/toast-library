import React from 'react';

export default class Toasts {
  static _instance = null;
  type;
  title;
  description;
  backgroundColor;
  refToastContainer;
  positionX;
  positionY;

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

  show() {
    const type = this.type;
    const title = this.title;
    const description = this.description;
    const backgroundColor = this.backgroundColor;
    const positionX = this.positionX;
    const positionY = this.positionY;
    const position = { positionX, positionY };
    this.refToastContainer.current.show({ type, backgroundColor, title, description, position });
  }

  hide() {
    this.refToastContainer.current.hide();
  }
}
