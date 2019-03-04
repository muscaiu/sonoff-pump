import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import logo from 'assets/img/logo.svg';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LogoImg = styled.img`
  animation: ${props => (props.isActive ? `${rotate360} infinite 20s linear` : 'null')};
  height: 150px;
`;

class Logo extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    showNotification: PropTypes.func,
  };

  render() {
    const { isActive } = this.props;
    return <LogoImg isActive={isActive} src={logo} />;
  }
}

export default Logo;
