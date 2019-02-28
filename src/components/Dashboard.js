import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

import NotificationAlert from 'react-notification-alert';
import { Row, Col } from 'reactstrap';

import Header from 'components/Header/Header';
import Spinner from 'components/Header/Spinner';
import StatusChart from 'components/Charts/StatusChart';
import TempChart from 'components/Charts/TempChart';
import LivingTempChart from 'components/Charts/LivingTempChart';

class Dashboard extends React.Component {
  static proptypes = {
    fbStatus: PropTypes.bool.isRequired,
    fbMode: PropTypes.string.isRequired,
    fbLastAction: PropTypes.object
  };

  showNotification = (place, type, message) => {
    // primary, success, dandger, warning, info
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
    const { fbStatus, fbMode, fbLastAction, fbStatusList, fbTempList, fbLivingTempList } = this.props;
    return isLoaded(fbStatus) ? (
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
          <Row>
            <Col xs="12">
              <LivingTempChart fbLivingTempList={fbLivingTempList} />
            </Col>
          </Row>
        </div>
        <NotificationAlert ref="notificationAlert" />
      </Fragment>
    ) : (
        <Spinner />
      );
  }
}

function mapStateToProps(state) {
  const fbStatusList = state.firestore.ordered.status;
  const fbModeList = state.firestore.ordered.mode;
  const fbTempList = state.firestore.ordered.temp;
  const fbLivingTempList = state.firestore.ordered.livingTemp;

  return {
    fbStatus: fbStatusList && fbStatusList[0].value,
    fbMode: fbModeList && fbModeList[0].value,
    fbLastAction: fbStatusList && fbStatusList[0].createdAt,
    fbStatusList,
    fbTempList,
    fbLivingTempList
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'status', limit: 100, orderBy: ['createdAt', 'desc'] },
    { collection: 'mode', limit: 1, orderBy: ['createdAt', 'desc'] },
    { collection: 'temp', limit: 100, orderBy: ['createdAt', 'desc'] },
    { collection: 'livingTemp', limit: 100, orderBy: ['createdAt', 'desc'] }
  ])
)(Dashboard);
