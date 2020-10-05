import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorIndicator from '../ErrorIndicator';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorIndicator />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
