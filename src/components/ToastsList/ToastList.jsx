import React, { Component, createRef } from 'react';

import { DEFAULT_INDENT_Y } from 'src/constants';

import ToastItem from 'src/components/ToastItem';

export default class ToastList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfToasts: [],
      defaultIndentY: DEFAULT_INDENT_Y,
      toastsRefs: [],
    };
  }

  componentDidMount() {
    this.setState(
      (prevState) => ({
        toastsRefs: Array(prevState.arrayOfToasts.length)
          .fill(null)
          .map((_, idx) => prevState.toastsRefs[idx] || createRef()),
      }),
      () => console.log(this.state.toastsRefs)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.arrayOfToasts.length === nextState.arrayOfToasts.length &&
      this.state.toastsRefs.length === nextState.toastsRefs.length
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setState(
      (prevState) => ({
        toastsRefs: Array(prevState.arrayOfToasts.length)
          .fill(null)
          .map((_, idx) => prevState.toastsRefs[idx] || createRef()),
      }),
      () => console.log(this.state.toastsRefs)
    );
  }

  setToastsRefs = (arr) => {
    this.setToastsRefs(arr);
  };

  onClose = (id) => {
    this.setState((prevState) => {
      return {
        arrayOfToasts: prevState.arrayOfToasts.map((toast) => {
          if (toast.id === id) {
            return {
              ...toast,
              isFade: true,
              isMouseButtonPressedDown: false,
            };
          }
          return toast;
        }),
        currentPressedToast: null,
      };
    });
  };

  onAnimationEnd = (id, isFade) => {
    if (isFade) {
      this.hide(id);
    }
  };

  show(options) {
    const { arrayOfToasts, onDelete, defaultIndentY, defaultIndentX, setToastsRefs } = options;
    this.onDeleteFromService = onDelete;
    this.setToastsRefs = setToastsRefs;
    this.setState({ arrayOfToasts, defaultIndentY, defaultIndentX });
  }

  hide(id) {
    const { defaultIndentY } = this.state;
    this.onDeleteFromService(id);
    this.setState((prevState) => {
      return {
        arrayOfToasts: prevState.arrayOfToasts
          .filter((toast) => toast.id !== id)
          .map((toast, idx, arr) => {
            if (idx !== 0) {
              return {
                ...toast,
                indents: {
                  ...toast.indents,
                  indentY: arr[idx - 1].ref.current.offsetHeight + defaultIndentY + 10,
                },
              };
            }
            return {
              ...toast,
              indents: {
                ...toast.indents,
                indentY: prevState.defaultIndentY,
              },
            };
          }),
      };
    });
  }

  render() {
    const { arrayOfToasts, defaultIndentX, toastsRefs } = this.state;
    return arrayOfToasts.map((toast, idx) => (
      <ToastItem
        key={toast.id}
        toast={toast}
        onAnimationEnd={this.onAnimationEnd}
        onClose={this.onClose}
        defaultIndentX={defaultIndentX}
        ref={toastsRefs[idx]}
      />
    ));
  }
}
