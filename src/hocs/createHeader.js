import React from 'react';
import moment from 'moment';

export default function createHeader(WrappedComponent) {
    class Header extends React.Component {
        state = {
            showModal: false,
            dialogType: '',
        };

        getLastAction = () => this.props.fbLastAction && moment(this.props.fbLastAction.toDate()).from();

        handleToggleModal = (toggle, title) => {
            this.setState({
                showModal: toggle,
                dialogType: title,
            });
        };

        render() {
            const { showModal, dialogType } = this.state;

            return (
                <WrappedComponent
                    {...this.props}
                    getLastAction={this.getLastAction}
                    onToggleModal={this.handleToggleModal}
                    showModal={showModal}
                    dialogType={dialogType}
                />
            )
        }
    }

    return (Header);
}
