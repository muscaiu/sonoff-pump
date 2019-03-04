import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

import { Button, ButtonGroup, Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';

import createHeader from 'hocs/createHeader';

import Logo from 'components/Header/Logo';
import OnOffSwitch from 'components/Header/OnOffSwitch';
import pack from '../../../package.json';
import Modal from 'components/Modals/Modal';

const Version = styled.div`
  color: darkgrey;
  font-size: 8px;
  position: fixed;
  bottom: 10px;
`;

const Distance = styled.div`
  color: #9a9a9a;
  font-size: 15px;
`;

const Header = ({
  fbStatus,
  fbMode,
  showNotification,
  getLastAction,
  onToggleModal,
  showModal,
  dialogType,
}) => (
    <React.Fragment>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Auto interval 19:00 - 20:00</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" /> {fbStatus ? 'ON' : 'OFF'}
              </CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                <Button
                  color="info"
                  id="1"
                  size="sm"
                  tag="label"
                  className={classNames('btn-simple', {
                    active: fbMode === 'auto',
                  })}
                  onClick={() => fbMode === 'manual' && onToggleModal(true, 'mode')}
                >
                  <span className="d-sm-block d-md-block d-lg-block d-xl-block">Auto</span>
                </Button>
                <Button
                  tag="label"
                  className={classNames('btn-simple', {
                    active: fbMode === 'manual',
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => fbMode === 'auto' && onToggleModal(true, 'mode')}
                >
                  <span className="d-sm-block d-md-block d-lg-block d-xl-block">Manual</span>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="places-buttons">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <Logo isActive={fbStatus} showNotification={showNotification} />
                <OnOffSwitch
                  isActive={fbStatus}
                  onStatusClick={this.hanldeToggleStats}
                  mode={fbMode}
                  showNotification={showNotification}
                />
                <Distance>last action: {getLastAction()}</Distance>
                <Version>version: {pack.version}</Version>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
      <Modal
        type={dialogType}
        show={showModal}
        onClose={() => onToggleModal(false)}
        showNotification={showNotification}
        isActive={fbStatus}
        mode={fbMode}
      />
    </React.Fragment>
  )

export default createHeader(Header);

Header.propTypes = {
  fbStatus: PropTypes.bool.isRequired,
  fbMode: PropTypes.string,
  showNotification: PropTypes.func.isRequired,
  fbLastAction: PropTypes.object,
}