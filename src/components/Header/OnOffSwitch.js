import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;

const SwitchWrapper = styled.div`
  text-align: center;
`;

class OnOffSwitch extends Component {

  handleNotifyDisabled = () => {
    const { showNotification, mode } = this.props;
    if (mode === 'auto') {
      showNotification('bc', 'warning', 'Disabled in Auto Mode');
    }
  };

  render() {
    const {
      isActive,
      mode,
      onToggleModal,
    } = this.props;

    return (
      <Fragment>
        <SwitchWrapper onClick={this.handleNotifyDisabled}>
          <OnOff color={isActive ? '#BDBDBD' : '#1f8ef1'}>Off</OnOff>
          <Switch
            disabled={mode === 'auto'}
            checked={isActive}
            onChange={() => onToggleModal(true, 'onoff')}
            value="isActive"
            color="primary"
          />
          <OnOff color={isActive ? '#1f8ef1' : '#BDBDBD'}>On</OnOff>
        </SwitchWrapper>

      </Fragment>
    );
  }
}

export default OnOffSwitch;

OnOffSwitch.prototypes = {
  isActive: PropTypes.bool,
  mode: PropTypes.string,
  showNotification: PropTypes.func,
}