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
            this.props.fetchStatusList();
            //TODO: this next
            // this.props.fetchTemperatureList();
        }

        render() {
            // return <WrappedComponent {...this.props} />
            return this.props.isLoadingData
                ? <Spinner />
                : <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            isLoadingData: state.api.isLoadingData,
            lastAction: state.status.lastAction,
            mode: state.mode.mode,
            status: state.status.status,
            statusList: state.status.statusList,
            temperature: state.status.temperature,
        };
    }

    return connect(mapStateToProps, {
        ...statusActions,
        ...modeActions,
    })(Dashboard);
}
