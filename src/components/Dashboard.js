import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import axios from 'axios';

import NotificationAlert from 'react-notification-alert';
import { Row, Col } from 'reactstrap';

import Header from 'components/Header/Header';
import Spinner from 'components/Header/Spinner';
import StatusChart from 'components/Charts/StatusChart';
import TempChart from 'components/Charts/TempChart';

class Dashboard extends React.Component {
  static proptypes = {
    fbStatus: PropTypes.bool.isRequired,
    fbMode: PropTypes.string.isRequired,
    fbLastAction: PropTypes.object
  };

  state = {
    temperature: 0,
    humidity: 0
  }

  componentDidMount() {
    axios.get('http://cassusa.go.ro:3001/api/status')
      .then((response) => {
        const { temperature, humidity } = response.data;
        this.setState({
          temperature,
          humidity
        })
      })
      .catch(function (err) {
        console.log(err)
      })
  }

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
    const { temperature, humidity } = this.state;
    const { fbStatus, fbMode, fbLastAction, fbStatusList, fbTempList } = this.props;
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
                temperature={temperature}
                humidity={humidity}
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

  return {
    fbStatus: fbStatusList && fbStatusList[0].value,
    fbMode: fbModeList && fbModeList[0].value,
    fbLastAction: fbStatusList && fbStatusList[0].createdAt,
    fbStatusList,
    fbTempList
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'status', limit: 100, orderBy: ['createdAt', 'desc'] },
    { collection: 'mode', limit: 1, orderBy: ['createdAt', 'desc'] },
    { collection: 'temp', limit: 100, orderBy: ['createdAt', 'desc'] }
  ])
)(Dashboard);
