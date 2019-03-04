import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';

import Modal from 'components/Modals/Modal';
import withModal from 'hocs/withModal';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;

const SwitchWrapper = styled.div`
  text-align: center;
`;

class OnOffSwitch extends Component {
  render() {
    const {
      isActive,
      mode,
      showNotification,
      showModal,
      dialogType,
      onToggleModal,
      onNotifyDisabled
    } = this.props;
    return (
      <Fragment>
        <SwitchWrapper onClick={onNotifyDisabled}>
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

        <Modal
          type={dialogType}
          show={showModal}
          onClose={() => onToggleModal(false)}
          showNotification={showNotification}
          isActive={isActive}
          mode={mode}
        />
      </Fragment>
    );
  }
}

export default withModal(OnOffSwitch);

OnOffSwitch.prototypes = {
  isActive: PropTypes.bool,
  mode: PropTypes.string,
  showNotification: PropTypes.func,
}