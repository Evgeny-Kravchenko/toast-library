import React from 'react';

export default class Toasts {
  static _instance = null;
  type;
  title;
  description;
  backgroundColor;
  refToastContainer;

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

  show() {
    const type = this.type;
    const title = this.title;
    const description = this.description;
    const backgroundColor = this.backgroundColor;
    this.refToastContainer.current.show({ type, backgroundColor, title, description });
  }

  hide() {
    this.refToastContainer.current.hide();
  }
}
