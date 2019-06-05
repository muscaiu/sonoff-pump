import React from 'react';
import { connect } from 'react-redux';

import * as modeActions from 'actions/modeActions';
import * as statusActions from 'actions/statusActions';
import Spinner from 'components/Header/Spinner';

export default function createDashboard(WrappedComponent) {
    class Dashboard extends React.Component {
        componentDidMount() {
            this.props.fetchInitialMode();
            this.props.fetchInitialStatus();
        }

        render() {
            return this.props.isLoadingData
                ? <Spinner />
                : <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            mode: state.mode.mode,
            status: state.status.status,
            lastAction: state.status.lastAction,
            isLoadingData: state.api.isLoadingData
        };
    }

    return connect(mapStateToProps, {
        ...statusActions,
        ...modeActions
    })(Dashboard);
}
