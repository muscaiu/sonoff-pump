import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NotificationAlert from 'react-notification-alert';
import { Row, Col } from 'reactstrap';

import createDashboard from 'hocs/createDashboard';

import Header from 'components/Header/Header';
import StatusChart from 'components/Charts/StatusChart';
import TempChart from 'components/Charts/TempChart';
// import LivingTempChart from 'components/Charts/LivingTempChart';

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
      // fbLivingTempList
    } = this.props;

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

          {/* <Row>
            <Col xs="12">
              <LivingTempChart fbLivingTempList={fbLivingTempList} />
            </Col>
          </Row> */}

        </div>
        <NotificationAlert ref="notificationAlert" />
      </Fragment>
    )
  }

  static proptypes = {
    fbStatus: PropTypes.bool.isRequired,
    fbMode: PropTypes.string,
    fbLastAction: PropTypes.object,
    fbStatusList: PropTypes.array,
    fbTempList: PropTypes.array,
    // fbLivingTempList: PropTypes.array
  };
}

export default createDashboard(Dashboard);
