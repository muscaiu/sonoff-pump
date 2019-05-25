import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NotificationAlert from 'react-notification-alert';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

import createDashboard from 'hocs/createDashboard';
import Header from 'components/Header/Header';
import StatusChart from 'components/Charts/StatusChart';
import TempChart from 'components/Charts/TempChart';
import Modal from 'components/Modals/Modal';
import withModal from 'hocs/withModal';
import pack from '../../package.json';

const Version = styled.div`
  color: darkgrey;
  font-size: 8px;
`;

class Dashboard extends React.Component {
  showNotification = (place, type, message) => {
    const options = {
      place,
      message: <div>{message}</div>,
      type,
      icon: 'tim-icons icon-bell-55',
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    const {
      fbStatus,
      fbMode,
      fbLastAction,
      fbStatusList,
      fbTempList,
      showModal,
      dialogType,
      onToggleModal,
    } = this.props;
    console.log(this.props)
    return (
      <Fragment>
        <div className="content">
          <Row>
            <Col xs="12">
              <Header
                fbStatus={fbStatus}
                fbMode={fbMode}
                fbLastAction={fbLastAction}
                showNotification={this.showNotification}
                onToggleModal={onToggleModal}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <StatusChart fbStatusList={fbStatusList} />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <TempChart fbTempList={fbTempList} />
            </Col>
          </Row>
          <Version>version: {pack.version}</Version>
        </div>
        <NotificationAlert ref="notificationAlert" />
        <Modal
          type={dialogType}
          show={showModal}
          onClose={() => onToggleModal(false)}
          showNotification={this.showNotification}
          isActive={fbStatus}
          mode={fbMode}
        />
      </Fragment>
    )
  }
}

Dashboard.proptypes = {
  fbStatus: PropTypes.bool.isRequired,
  fbMode: PropTypes.string,
  fbLastAction: PropTypes.object,
  fbStatusList: PropTypes.array,
  fbTempList: PropTypes.array,
}

export default createDashboard(withModal(Dashboard));
