import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { ButtonGroup, Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import Logo from 'components/Header/Logo';
import OnOffSwitch from 'components/Header/OnOffSwitch';
import { AutoButton, ManualButton } from 'components/Buttons';

const Distance = styled.div`
  color: #9a9a9a;
  font-size: 15px;
`;

const getLastAction = (lastAction) => lastAction && moment(lastAction).from();

const Header = ({
  showNotification,
  onToggleModal,
  mode,
  status,
  lastAction,
}) => {

  return (
    <React.Fragment>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Auto interval 09:00 - 09:30</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" /> {status ? 'ON' : 'OFF'}
              </CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                <AutoButton mode={mode} onToggleModal={onToggleModal} />
                <ManualButton mode={mode} onToggleModal={onToggleModal} />
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="places-buttons">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <Logo isActive={status} showNotification={showNotification} />
                <OnOffSwitch
                  isActive={status}
                  onStatusClick={this.hanldeToggleStats}
                  mode={mode}
                  showNotification={showNotification}
                  onToggleModal={onToggleModal}
                />
                <Distance>last action: {getLastAction(lastAction)}</Distance>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Header;
