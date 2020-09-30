import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Title = styled.h1`
  color: ${(props) => (props.theme === 'primary' ? '#000000' : '#00ff00')};
`;

const TestComponent = ({ theme }) => <Title theme={theme}>Test component!</Title>;

TestComponent.propTypes = {
  theme: propTypes.string.isRequired,
};

export default TestComponent;
