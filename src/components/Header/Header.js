import React from 'react';
import PropTypes from 'prop-types';
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

const getLastAction = (fbLastAction) => fbLastAction && moment(fbLastAction.toDate()).from();

const Header = ({
  fbStatus,
  fbMode,
  showNotification,
  onToggleModal,
  fbLastAction
}) => (
    <React.Fragment>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Auto interval 09:00 - 09:30</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" /> {fbStatus ? 'ON' : 'OFF'}
              </CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                <AutoButton fbMode={fbMode} onToggleModal={onToggleModal} />
                <ManualButton fbMode={fbMode} onToggleModal={onToggleModal} />
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
                  onToggleModal={onToggleModal}
                />
                <Distance>last action: {getLastAction(fbLastAction)}</Distance>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )

export default Header;

Header.propTypes = {
  fbStatus: PropTypes.bool.isRequired,
  fbMode: PropTypes.string,
  showNotification: PropTypes.func.isRequired,
  fbLastAction: PropTypes.object,
}
