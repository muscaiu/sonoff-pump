import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import Spinner from 'components/Header/Spinner';

export default function createDashboard(WrappedComponent) {
    const Dashboard = (props) => {
        return isLoaded(props.fbStatus)
            ? <WrappedComponent {...props} />
            : <Spinner />
    }

    function mapStateToProps(state) {
        const fbStatusList = state.firestore.ordered.status;
        const fbModeList = state.firestore.ordered.mode;
        const fbTempList = state.firestore.ordered.temp;
        // const fbLivingTempList = state.firestore.ordered.livingTemp;

        return {
            fbStatus: fbStatusList && fbStatusList[0].value,
            fbMode: fbModeList && fbModeList[0].value,
            fbLastAction: fbStatusList && fbStatusList[0].createdAt,
            fbStatusList,
            fbTempList,
            // fbLivingTempList
        };
    }

    return compose(
        connect(mapStateToProps),
        firestoreConnect([
            { collection: 'status', limit: 100, orderBy: ['createdAt', 'desc'] },
            { collection: 'mode', limit: 1, orderBy: ['createdAt', 'desc'] },
            { collection: 'temp', limit: 100, orderBy: ['createdAt', 'desc'] },
            // { collection: 'livingTemp', limit: 100, orderBy: ['createdAt', 'desc'] }
        ])
    )(Dashboard);
}
