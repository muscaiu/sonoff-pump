import React from 'react';

export default function withModal(WrappedComponent) {
    class Dialog extends React.Component {
        state = {
            showModal: false,
            dialogType: '',
        };

        handleToggleModal = (toggle, title) => {
            this.setState({
                showModal: toggle,
                dialogType: title,
            });
        };

        handleNotifyDisabled = () => {
            const { showNotification, mode } = this.props;
            if (mode === 'auto') {
                showNotification('bc', 'warning', 'Disabled in Auto Mode');
            }
        };

        render() {
            const { showModal, dialogType } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    onToggleModal={this.handleToggleModal}
                    onNotifyDisabled={this.handleNotifyDisabled}
                    showModal={showModal}
                    dialogType={dialogType}
                />
            )
        }
    }

    return (Dialog);
}
