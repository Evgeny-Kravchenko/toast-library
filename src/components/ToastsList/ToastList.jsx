import React, { Component, createRef } from 'react';

import { DEFAULT_INDENT_Y } from 'src/constants';

import ToastItem from 'src/components/ToastItem';
import Portal from 'src/components/Portal';

export default class ToastList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfToasts: [],
      defaultIndentY: DEFAULT_INDENT_Y,
      toastsRefs: [],
    };
  }

  componentDidUpdate() {
    const { toastsRefs } = this.state;
    this.setToastsRefs(toastsRefs);
  }

  setToastsRefs = (arr) => {
    this.setToastsRefs(arr);
  };

  setIsFadeForOneToasts = (id, value) => {
    this.setState((prevState) => ({
      arrayOfToasts: prevState.arrayOfToasts.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isFade: value,
          };
        }
        return item;
      }),
    }));
  };

  hide = (id) => {
    this.onDeleteFromService(id);
    this.setState((prevState) => {
      return {
        arrayOfToasts: this.getNewArrayOfToastsFromService(),
        toastsRefs: prevState.toastsRefs.filter((item) => item.id !== id),
      };
    });
  };

  show(options) {
    const {
      arrayOfToasts,
      onDelete,
      defaultIndentX,
      setToastsRefs,
      getNewArrayOfToastsFromService,
    } = options;
    this.onDeleteFromService = onDelete;
    this.getNewArrayOfToastsFromService = getNewArrayOfToastsFromService;
    this.setToastsRefs = setToastsRefs;
    this.setState({
      arrayOfToasts,
      defaultIndentX,
      toastsRefs: Array(arrayOfToasts.length)
        .fill(null)
        .map((i, idx) => ({ ref: (i && i.ref) || createRef(), id: arrayOfToasts[idx].id })),
    });
  }

  render() {
    const { arrayOfToasts, defaultIndentX, toastsRefs } = this.state;
    return arrayOfToasts.map((toast, idx) => (
      <Portal key={toast.id}>
        <ToastItem
          toast={toast}
          onAnimationEnd={this.onAnimationEnd}
          onHide={this.hide}
          defaultIndentX={defaultIndentX}
          ref={toastsRefs[idx].ref}
          setIsFadeForOneToasts={this.setIsFadeForOneToasts}
        />
      </Portal>
    ));
  }
}
